// TODO: when filtering by zone, update donut chart,
// TODO: when filtering by keyword, update both chart. 

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import NavBarMustering from '../../../src/webApps/Mustering/utils/NavBarMustering'
import Chart from '../../../src/webApps/Mustering/Components/Activity/Chart/Treemap/Chart'
import withChart from './withChart'
import Pie from '../../../src/webApps/Mustering/Components/Activity/Chart/Pie/Pie'
import withChartPie from './withPie'
import ApiHandler from '../../services/ApiHandler'
import { Typography } from '@mui/material'
import moment from 'moment'
import { socketIO } from '../../utils/WebSockets'
import { withTranslation } from 'react-i18next'
import { isNullOrUndefined } from 'util'
import { debounce } from 'throttle-debounce'

let page = 0
let rowsPerPage = 10
let activeColumnSort = 0
let order = 'asc'

const ChartPie = withChartPie(Pie)
const ChartTreemap = withChart(Chart)

const LogicComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props)
      const { t } = props
      this.state = {
        isLoading: true,
        dateTime: moment(),
        isLoadingNewData: false,
        isSearching: false,
        dataCount: 0,
        musterEventID: 0,
        optionsZones: {
          responsive: true,
          title: {
            display: true,
            text: t('Zones'),
            fontColor: 'white',
            fontSize: 20,
          },
          legend: {
            position: 'bottom',
            labels: {
              fontColor: 'white',
              fontSize: 15,
              boxWidth: 10,
            },
          },
        },
        optionsSafePersons: {
          responsive: true,
          title: {
            display: true,
            text: t('safeUnsafePeople'),
            fontColor: 'white',
            fontSize: 20,
          },
          legend: {
            position: 'bottom',
            labels: {
              fontColor: 'white',
              fontSize: 15,
              boxWidth: 10,
            },
          },
        },
        notDebouncedSearchText:"",
        searchText: '',
        dataPersonSafe: [],
        dataZone: [],
        activeEvents: [],
        filter: -1,
        filters: [],
        ZoneID: -1,
        zonesInResults: [], // When filtering by keyword or pie chart
        columns: this.translateColumns(t, true),
      }
      this.changeSearchDebounce = debounce(1000, (value) =>
        this.setState({
          searchText:value,
          isSearching: true,
          isLoadingNewData: true,
        })
      )
      this.interval = undefined;
      this.getPersonsByZone = this.getPersonsByZone.bind(this)
      this.getSafeOrUnsafePeople = this.getSafeOrUnsafePeople.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.i18n.language !== prevState.language) {
        return {
          language: nextProps.i18n.language,
        }
      } else return null
    }

    

    translateColumns = (t, initial) => {
      const isDesktop = window.innerWidth > 900
      let colStorage = JSON.parse(localStorage.getItem('whitActivityColumns'))

      let columDisplay = {}
      if (initial && !isNullOrUndefined(colStorage)) {
        colStorage &&
          colStorage.map(
            (elem) =>
              (columDisplay[elem.field] = !isNullOrUndefined(
                elem.options.display
              )
                ? elem.options.display
                : true)
          )
      } else {
        this.state &&
          this.state.columns &&
          this.state.columns.map(
            (elem) =>
              (columDisplay[elem.field] = !isNullOrUndefined(
                elem.options.display
              )
                ? elem.options.display
                : true)
          )
      }
      return [
        {
          name: t('name'),
          field: 'name',
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.name)
              ? true
              : columDisplay.name,
            sortDirection: activeColumnSort === 0 ? order : 'none',
          },
        },
        {
          name: t('status'),
          field: 'status',
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.status)
              ? true
              : columDisplay.status,
            sortDirection: activeColumnSort === 1 ? order : 'none',
            customBodyRender: (data) => {
              return (
                <Typography>
                  {data.status === 'Seguro' ? t('Safe') : t('Unsafe')}
                </Typography>
              )
            },
          },
        },
        {
          name: t('Zone'),
          field: 'zoneName',
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.zoneName)
              ? true
              : columDisplay.zoneName,
            sortDirection: activeColumnSort === 2 ? order : 'none',
          },
        },
        {
          name: t('Date'),
          field: 'dateAccess',
          options: {
            display: isNullOrUndefined(columDisplay.dateAccess)
              ? true
              : columDisplay.dateAccess,
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 3 ? order : 'none',
          },
        },
        {
          name: t('reader'),
          field: 'readerName',
          options: {
            display: isNullOrUndefined(columDisplay.readerName)
              ? true
              : columDisplay.readerName,
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 4 ? order : 'none',
          },
        },
        {
          name: t('Area'),
          field: 'area',
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.accessID)
              ? true
              : columDisplay.accessID,
            sortDirection: activeColumnSort === 5 ? order : 'none',
          },
        },
        {
          name: t('AreaGroup'),
          field: 'areaGroup',
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.id)
              ? true
              : columDisplay.id,
            sortDirection: activeColumnSort === 6 ? order : 'none',
          },
        },
      ]
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 })
    }

    //TODO: Pass filters to query

    // [---- GET API DATA ----]

    async getMusteringSettings(){
      return ApiHandler.Setting.Setting.getMusteringSettings()
      .then(async ({ data }) => {
        console.log("getMusteringSettings/",{response:data})

        // Adjust time depending on event's creator timezone
        this.setState((prev) =>{
          return {
            dateTime: prev.dateTime.add(-data.data.offsetMustering, 'hours')
          }
        })
        return;
      })
      .catch((error) => {
        console.log(error)
      })
    }
    async getActiveMusterEvents(){
      return ApiHandler.Mustering.Events.getActiveMusterEvents()
          .then((response) => {
              //DELETE
              console.log("getActiveMusterEvents/",{response})

              const newActiveEvents =  response.data.map(event=>{
                return {
                  label:  `${event.id} - ${moment(event.start).format(
                    'YYYY-MM-DD HH:mm:ss'
                    )}`,
                  value: event.id
                }
              })
              
              // Update state with new Active Events
              this.setState({
                activeEvents: newActiveEvents,
                isLoadingNewData: false,
                musterEventID: this.props.history.location.state
                  ? this.props.history.location.state:response.data.length > 0
                    ? response.data[0].id
                    : 0
              })

              return response
            })
    }
    getAllPeople(){
      const {searchText, musterEventID } = this.state,
           { t } = this.props;

      //Activate loader
      this.setState({ isLoadingNewData: true })

      console.log(`%cgetAllPeople...\nMusterEventID: ${musterEventID} \nkeyword: ${searchText}`,"color:yellow;font-family:monospace");
      ApiHandler.Mustering.Activity.getAllPeople(
        this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'), //Date
        page * rowsPerPage, //Start
        rowsPerPage, //length
        searchText, //search
        activeColumnSort,
        order,
        musterEventID
      )
      .then((response) => {
        console.log("getAllPeople/", {response})

        const zones = response.data.dataAllPeople.map(item=>item.zoneId);
        this.setState({
          dataPersonSafe: [
            ...(response.data.dataSafePeopleCount ? [{
              name: t('Safe'),
              value: response.data.dataSafePeopleCount,
              Id: 0,
            }] : []),
            ...(response.data.dataUnsafePeopleCount ? [{
              name: t('Unsafe'),
              value: response.data.dataUnsafePeopleCount,
              Id: 1,
            }] : []),
          ],
          data: response.data.dataAllPeople,
          dataCount: response.data.allCount,
          isLoadingNewData: false,
          isLoading: false,
          isSearching: false,
          musterEventID,
          filter: -1,
          ZoneID: -1, // Reset Zone
          zonesInResults: zones,
          filters:[
            ...(searchText ? [searchText] : []),
          ]
          
        })
        // [Out of use: Replaced by setInterval]
        // socketIO.emit('changes')
        // socketIO.on('AnyChange', function (data) {
        //   if (data.message[24]) {
        //     loadDataTable()
        //     loadData(true)
        //   }
        // })
      })
      .catch((err) => {
        // When there is no accesses attached to the event
        // status 400 Bad Request is happening. 
        console.log("withActivity.js/getAllPeople\ncatch")
        // Manually set state to empty values
        this.setState({
          dataPersonSafe: [
            {
              name: t('Safe'),
              value: 0,
              Id: 0,
            },
            {
              name: t('Unsafe'),
              value: 0,
              Id: 1,
            },
          ],
          data: [],
          dataCount: 0,
          isLoadingNewData: false,
          isLoading: false,
          isSearching: false,
          filter: -1,
          filters: []
        })
      })
    }
    getZones(){
      const { musterEventID } = this.state;
      console.log(`%cgetZones...\nMusterEventID: ${musterEventID}`,"color:yellow;font-family:monospace")

      ApiHandler.Mustering.Activity.getZones(
        this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
        page * rowsPerPage,
        rowsPerPage,
        musterEventID,
        false
      )
        .then((response) => {
          console.log("getZones/", {response})
          this.setState({dataZone:[]});
          response.data.dataAllPeople.map((value) => {
            if (value.id !== -1) {
              return this.setState((prevState) => ({
                dataZone: [
                  ...prevState.dataZone,
                  {
                    name: value.name,
                    size: value.personas,
                    Id: value.id,
                  },
                ],
                isLoadingNewData: false,
                isLoading: false,
                isSearching: false,
                musterEventID,
              }))
            }
            return 0
          })
        })
        .catch((error) => {
          console.log("getZones Error:", error)

          this.setState({
            isLoadingNewData: false,
            isLoading: false,
            isSearching: false,

          })
        })
    }
    async getPersonsByZone(zoneID){
      const { searchText, musterEventID } = this.state;
      const {t} = this.props;
      this.setState({ isLoadingNewData: true })
      
      return ApiHandler.Mustering.Activity.getPersonByZone(
        this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
        zoneID,
        page * rowsPerPage,
        rowsPerPage,
        "", // searchText: Setted to empty because backend doesn't support multifilter search
        activeColumnSort,
        order,
        musterEventID
      )
        .then((response) => {
          //DELETE
          console.log("withActivity.js/getPersonsByZone", {response})

          this.setState((prev)=>(
              {
                data: response.data.dataAllPeople,
                dataCount: response.data.countPeople,
                dataPersonSafe: [
                  {
                    name: response.data.dataAllPeople.length > 0 && response.data.dataAllPeople[0].status == "Seguro" ? t('Safe') : t("Unsafe"),
                    value: response.data && response.data.countPeople,
                    Id: response.data.dataAllPeople.length > 0 && response.data.dataAllPeople[0].status == "Seguro" ? 0 : 1,
                  },
                  // {
                  //   name: t('Unsafe'),
                  //   value: response.data.dataAllPeople.length > 0 && response.data.dataAllPeople[0].status != "Seguro" ? response.data.countPeople : 0 ,
                  //   Id: 1,
                  // },
                ],
                ZoneID: zoneID,
                zonesInResults: [zoneID],
                filter: 2,
                isLoadingNewData: false,
                isSearching: false,
                filters:[
                  // ...(searchText ? [searchText] : []),  // Doesnt support multi filter
                  ...(response.data.dataAllPeople[0] ? [`${zoneID} - ${response.data.dataAllPeople[0].zoneName}`] : [])
                ],
                notDebouncedSearchText: ""
              }
          )
          )

          return response
        })
        .catch((err) => {
          this.setState({
            isLoadingNewData: false,
            isLoading: false,
            isSearching: false,
          })
        })
    }
    async getSafeOrUnsafePeople(isSafe){
      const { searchText, musterEventID } = this.state
      const {t} = this.props;
      this.setState({ isLoadingNewData: true })
      
      return ApiHandler.Mustering.Activity.getSafeOrUnsafePeople(
        this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
        !!isSafe,
        page * rowsPerPage,
        rowsPerPage,
        // searchText,
        "",
        activeColumnSort,
        order,
        musterEventID
      )
        .then((response) => {
          console.log("getSafeOrUnsafePeople/", {response})
          const zones = response.data.data.map(item=>item.zoneId)
          this.setState({
            data: response.data.data,
            dataCount: response.data.dataCount,
            isLoadingNewData: false,
            filter: !isSafe ? 0 : 1,
            isSearching: false,
            ZoneID: -1,
            zonesInResults: zones, 

            filters:[
              ...(isSafe ? [t("peopleSafe")] : [t("peopleUnSafe")])
            ],
            notDebouncedSearchText: ""
          })
        })
        .catch((err) => {
          this.setState({
            isLoadingNewData: false,
            isLoading: false,
            isSearching: false,

          })
        })

    }

    // [--- UPDATING LOGIC ---]
    updateData(customFilter){
      const {ZoneID} = this.state;
      const filter = customFilter || this.state.filter
      this.getZones();

      // Conventions
      // -1 : No Filter
      // 0 | 1 : Unsafe | Safe
      // 2 : By Zone

      switch (filter){
        case -1 :{
          console.log("withActivity.js/updateData", {
            filter,
            type: "All People"
          })

          this.getAllPeople();
          break;
        }
        case 1:
        case 0:{ 
          console.log("withActivity.js/updateData", {
            filter,
            type: "Safe or Unsafe"
          })

          this.getSafeOrUnsafePeople(filter)
          break;
        }
        case 2:{
          console.log("withActivity.js/updateData", {
            filter,
            type: "By Zone"
          })

          this.getPersonsByZone(ZoneID)
          break;
        }
      }

    }

// [---- LIFECICLE ----]
  
    async componentDidMount() {
      // Update isDesktop
      this.updateScreenMode()
      NavBarMustering.hideLoader()
      try {
        // get Mustering settings
        const musteringSettings = await this.getMusteringSettings();
        // get Active Events
        const API_ActiveEvents = await this.getActiveMusterEvents();
        if (API_ActiveEvents.data && API_ActiveEvents.data.length > 0) {

          // const updateEventData = () => {
          //   console.log("updateEventData/",{state: this.state})
          //   // Get safe and unsafe people
          //   this.getAllPeople();
          //   // Get Zones
          //   this.getZones();
          // }

          this.interval=setInterval(()=>{
            this.updateData();
          },15000)

        } else {
          console.log('No active events')
          this.setState({ isLoadingNewData: false, isLoading: false })
        }
      } catch (e){
        console.log(e)
      }
    }
    componentDidUpdate(prevProps, prevState) {

      // Language change
      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t, false),
        })
      }

      // Active Event Change
      if(prevState.musterEventID !== this.state.musterEventID){
        //DELETE
        console.log(`withActivity.js/componentDidUpdate\nChanged: musterEventID ${this.state.musterEventID}`)
        this.updateData()
      }

      // Filter Change
      if(prevState.filter !== this.state.filter){
        //DELETE
        console.log(`withActivity.js/componentDidUpdate\nChanged: filter`,{
          filter: this.state.filter,
          searchText: this.state.searchText
        })
        this.updateData() // update with all people
      }
      
      // Text change
      if(prevState.searchText !== this.state.searchText){
        //DELETE
        console.log(`withActivity.js/componentDidUpdate\nChanged: Search Text`,{
          filter: -1,
          searchText: this.state.searchText
        })
        this.updateData(-1) // update with all people
      }

      // Column sorted Change
      if(prevState.columns !== this.state.columns){
        //DELETE
        console.log(`withActivity.js/componentDidUpdate\nChanged: columns ${this.state.columns}`)
        this.updateData()
      }


      //DELETE
      //state console log
      console.log("withActivity/componentDidUpdate",{state: this.state})
    }

    componentWillUnmount() {
      socketIO.emit('unsubscribeChanges')
      //  window.removeEventListener("resize", this.updateScreenMode);
      window.removeEventListener('resize', this.updateScreenMode)
      clearInterval(this.interval);
    }

    
    // Select Active Event Handler
    handleSelectEventChange = (item) => {
      let musterEventID = item.value
      this.setState({
        musterEventID,
        filter: -1
      })
    }
    // loadDataTable = () => {
    //   const { searchText, dateTime, filter, ZoneID, musterEventID } = this.state
    //   this.setState({ isLoadingNewData: true })
    //   if (filter === -1) {
    //     ApiHandler.Mustering.Activity.getAllPeople(
    //       dateTime.format('MM/DD/YYYY HH:mm:ss'),
    //       page * rowsPerPage,
    //       rowsPerPage,
    //       searchText,
    //       activeColumnSort,
    //       order
    //     )
    //       .then((response) => {
    //         this.setState({
    //           data: response.data.dataAllPeople,
    //           isLoadingNewData: false,
    //           dataCount: response.data.allCount,
    //           isSearching: false,
    //         })
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           isLoadingNewData: false,
    //           isLoading: false,
    //         })
    //       })
    //   } else if (filter === 0 || filter === 1) {
    //     let isSafe = filter === 1 ? true : false
    //     ApiHandler.Mustering.Activity.getSafeOrUnsafePeople(
    //       this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
    //       isSafe,
    //       page * rowsPerPage,
    //       rowsPerPage,
    //       searchText,
    //       activeColumnSort,
    //       order,
    //       musterEventID
    //     )
    //       .then((response) => {
    //         this.setState({
    //           data: response.data.data,
    //           dataCount: response.data.dataCount,
    //           isLoadingNewData: false,
    //           filter: !isSafe ? 0 : 1,
    //         })
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           isLoadingNewData: false,
    //           isLoading: false,
    //         })
    //       })
    //   } else if (filter === 2) {
    //     ApiHandler.Mustering.Activity.getPersonByZone(
    //       this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
    //       ZoneID,
    //       page * rowsPerPage,
    //       rowsPerPage,
    //       searchText,
    //       activeColumnSort,
    //       order,
    //       musterEventID
    //     )
    //       .then((response) => {
    //         this.setState({
    //           data: response.data.dataAllPeople,
    //           dataCount: response.data.countPeople,
    //           isLoadingNewData: false,
    //           filter: 2,
    //         })
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           isLoadingNewData: false,
    //           isLoading: false,
    //         })
    //       })
    //   }
    // }

    // loadData = (contentLoader) => {
    //   const { searchText, dateTime, filter, ZoneID, musterEventID } = this.state
    //   const { t } = this.props
    //   if (contentLoader) this.setState({ isLoadingNewData: true })

    //   if (filter === -1) {
    //     ApiHandler.Mustering.Activity.getAllPeople(
    //       dateTime.format('MM/DD/YYYY HH:mm:ss'),
    //       page * rowsPerPage,
    //       rowsPerPage,
    //       searchText,
    //       activeColumnSort,
    //       order
    //     )
    //       .then((response) => {
    //         this.setState({
    //           dataPersonSafe: [
    //             {
    //               name: t('Safe'),
    //               value: response.data.dataSafePeopleCount,
    //               Id: 0,
    //             },
    //             {
    //               name: t('Unsafe'),
    //               value: response.data.dataUnsafePeopleCount,
    //               Id: 1,
    //             },
    //           ],
    //           data: response.data.dataAllPeople,
    //           dataCount: response.data.allCount,
    //           isLoadingNewData: false,
    //           isSearching: false,
    //         })
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           isLoadingNewData: false,
    //           isLoading: false,
    //         })
    //       })
    //   } else if (filter === 0 || filter === 1) {
    //     let isSafe = filter === 1 ? true : false
    //     ApiHandler.Mustering.Activity.getSafeOrUnsafePeople(
    //       this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
    //       isSafe,
    //       page * rowsPerPage,
    //       rowsPerPage,
    //       rowsPerPage,
    //       searchText,
    //       activeColumnSort,
    //       order,
    //       musterEventID
    //     )
    //       .then((response) => {
    //         this.setState({
    //           data: response.data.data,
    //           dataCount: response.data.dataCount,
    //           isLoadingNewData: false,
    //           filter: !isSafe ? 0 : 1,
    //         })
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           isLoadingNewData: false,
    //           isLoading: false,
    //         })
    //       })
    //   } else if (filter === 2) {
    //     ApiHandler.Mustering.Activity.getPersonByZone(
    //       this.state.dateTime.format('MM/DD/YYYY HH:mm:ss'),
    //       ZoneID,
    //       page * rowsPerPage,
    //       rowsPerPage,
    //       searchText,
    //       activeColumnSort,
    //       order,
    //       musterEventID
    //     )
    //       .then((response) => {
    //         this.setState({
    //           data: response.data.dataAllPeople,
    //           dataCount: response.data.countPeople,

    //           isLoadingNewData: false,
    //           filter: 2,
    //         })
    //       })
    //       .catch((err) => {
    //         this.setState({
    //           isLoadingNewData: false,
    //           isLoading: false,
    //         })
    //       })
    //   }
    //   // ApiHandler.Mustering.Activity.getZones(
    //   //   dateTime.format("MM/DD/YYYY HH:mm:ss"),
    //   //   searchText,
    //   //   activeColumnSort,
    //   //   order
    //   // ).then((response) => {
    //   //   this.setState(
    //   //     () => ({
    //   //       dataZone: [],
    //   //     }),
    //   //     () =>
    //   //       response.data.dataAllPeople.map((value) => {
    //   //         if (value.zoneID !== -1) {
    //   //           return this.setState((prevState) => ({
    //   //             dataZone: [
    //   //               ...prevState.dataZone,
    //   //               {
    //   //                 name: value.zone,
    //   //                 size: value.personCount,
    //   //                 Id: value.zoneID,
    //   //               },
    //   //             ],
    //   //           }));
    //   //         }
    //   //         return 0;
    //   //       })
    //   //   );
    //   // });
    // }

    changePage = (newPage) => {
      page = newPage
      this.setState({ isLoadingNewData: true })
      this.updateData();
    }

    changeRowsPerPage = (newRowsPerPage) => {
      rowsPerPage = newRowsPerPage
      this.updateData()
    }

    cleanFilter = () => {
      page = 0
      rowsPerPage = 10
      this.setState({ 
        searchText: '', 
        filter: -1,
        ZoneID: -1,
        notDebouncedSearchText: ""
      })
      // let searchText = ''


      // ApiHandler.Mustering.Activity.getAllPeople(
      //   dateTime.format('MM/DD/YYYY HH:mm:ss'),
      //   page * rowsPerPage,
      //   rowsPerPage,
      //   searchText,
      //   activeColumnSort,
      //   order,
      //   this.state.musterEventID
      // )
      //   .then((response) => {
      //     this.setState({
      //       dataPersonSafe: [
      //         {
      //           name: t('Safe'),
      //           value: response.data.dataSafePeopleCount,
      //           Id: 0,
      //         },
      //         {
      //           name: t('Unsafe'),
      //           value: response.data.dataUnsafePeopleCount,
      //           Id: 1,
      //         },
      //       ],
      //       data: response.data.dataAllPeople,
      //       dataCount: response.data.allCount,
      //       isLoadingNewData: false,
      //       isSearching: false,
      //       ZoneID: -1,
      //       filter: -1,
      //     })
      //   })
      //   .catch((err) => {
      //     this.setState({
      //       isLoadingNewData: false,
      //       isLoading: false,
      //     })
      //   })
    }

    changeSort = (activeColumnIndex, newOrder) => {
      const { columns } = this.state
      let columnsSorted = columns.slice()
      columnsSorted.map((column) => (column.options.sortDirection = undefined))
      columnsSorted[activeColumnIndex].options.sortDirection = newOrder
      activeColumnSort = activeColumnIndex
      order = newOrder
      this.setState({
        columns: columnsSorted,
      })
    }

    onchangeSearch = (searchText) => {
      let value = searchText ? searchText : ''
      this.setState({notDebouncedSearchText: value})
      this.changeSearchDebounce(value)
    }

    filterChange = (filterList) => {}

    columnViewChange = (newColumns) => {
      const { columns } = this.state
      let modifiedColumns = columns.slice()
      modifiedColumns.map(
        (column) =>
          (column.options.display = newColumns.some(
            (newColumn) =>
              newColumn.field === column.field && newColumn.display === 'true'
          ))
      )
      this.setState({
        columns: modifiedColumns,
      })
      localStorage.setItem(
        'whitActivityColumns',
        JSON.stringify(modifiedColumns)
      )
    }

    onTableChange = (action, tableState) => {
      switch (action) {
        case 'changePage':
          this.changePage(tableState.page)
          break
        case 'changeRowsPerPage':
          this.changeRowsPerPage(tableState.rowsPerPage)
          break
        case 'sort':
          this.changeSort(
            tableState.activeColumn,
            tableState.announceText.includes('ascending') ? 'asc' : 'desc'
          )
          break
        case 'search':
          this.onchangeSearch(tableState.searchText)
          break
        case 'filterChange':
          this.filterChange(tableState.filterList)
          break
        case 'columnViewChange':
          this.columnViewChange(tableState.columns)
          break
        default:
      }
    }

    pieChart = () => {
      const { dataPersonSafe } = this.state
      const { t } = this.props
      let existData = 0;
      if (dataPersonSafe[0]){
        existData += dataPersonSafe[0].value
      }
      if (dataPersonSafe[1]){
        existData += dataPersonSafe[1].value
      }
      if (!existData)
        return (
          <Typography
            style={{
              fontSize: 20,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              marginBottom: 5,
            }}
          >
            {t('NoData')}
          </Typography>
        )
      else
        return (
          <div>
            <ChartPie
              data={dataPersonSafe}
              filter={this.getSafeOrUnsafePeople}
              options={this.state.optionsSafePersons}
            />
          </div>
        )
    }

    treemapChart = () => {
      const { dataZone, ZoneID, zonesInResults} = this.state
      const { t , } = this.props
      if (dataZone.length > 0)
        return (
          <ChartTreemap
            zonesInResults={zonesInResults}
            selectedZone={ZoneID}
            data={dataZone}
            filter={this.getPersonsByZone}
            options={this.state.optionsZones}
          />
        )
      else
        return (
          <Typography
            style={{
              fontSize: 20,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              marginBottom: 5,
            }}
          >
            {t('NoData')}
          </Typography>
        )
    }

    render() {
      return (
        <Component
          {...this.props}
          data={this.state.data}
          page={page}
          rowsPerPage={rowsPerPage}
          columns={this.state.columns}
          isLoading={this.state.isLoading}
          isLoadingNewData={this.state.isLoadingNewData}
          dataCount={this.state.dataCount}
          isDesktop={this.state.isDesktop}
          isSearching={this.state.isSearching}
          filters={this.state.filters}
          cleanFilter={this.cleanFilter}
          onTableChange={this.onTableChange}
          treemapChart={this.treemapChart}
          pieChart={this.pieChart}
          activeEventsData={this.state.activeEvents}
          handleSelectEventChange={this.handleSelectEventChange}
          musterEventID={this.state.musterEventID}
          searchText={this.state.notDebouncedSearchText}
          onChangeSearchInput={this.onchangeSearch}
        />
      )
    }
  })

const mapDispatchToProps = {}

const mapStateToProps = ({}) => {
  return {}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  LogicComponent
)
