import React from "react";
import { Card, List, Icon, Divider, Transition } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";

import {
  requestPersonById,
  requestGetImage,
  requestClearStorePersonImage
} from "../../../../actions/EasyAccess/Person_actions";
import { createRequestGetDocumentByPersonId } from "../../../../actions/Aludoc/documents_action";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import Zoom from "@mui/material/Zoom";
import PersonIcon from "@mui/icons-material/PersonRounded";

class PersonInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      checked: false,
      showInfo: false,
      mountImage: false,
      hasPerson: true
    };
  }

  componentDidMount() {
    const { personId = -1 } = this.props;
    if (personId !== -1 && personId !== null) {
      this.setState({ hasPerson: true });
      this.props.getPersonById(personId);
      this.props.getDocumentsPerson({
        start: 0,
        length: 10,
        order: "name asc",
        search: "",
        id: personId,
        reference: "person"
      });
      this.props.getPersonImage(personId);
    } else this.setState({ hasPerson: false });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.personData !== prevState.personData ||
      nextProps.documentPerson !== prevState.documentPerson ||
      nextProps.personImage !== prevState.personImage
    ) {
      return {
        language: nextProps.i18n.language,
        personData: nextProps.personData,
        documentPerson: nextProps.documentPerson,
        personImage: nextProps.personImage
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.personImage !== this.state.personImage) {
      this.setState({ mountImage: true });
    }
  }

  componentWillUnmount() {
    this.props.clearStorePersonImage();
  }

  handleInfoClick = () => {
    this.setState(state => ({ showInfo: !state.showInfo }));
  };

  render() {
    const { t, classes, showInfo, personId } = this.props;
    const { personData, documentPerson, personImage, mountImage } = this.state;

    return (
      <React.Fragment>
        <Transition.Group animation="slide right" duration={500}>
          {showInfo && (
            <Card className={classes.card}>
              {personId && (
                <Card.Content
                  style={{ padding: 0 }}
                  className={classes.content}
                >
                  <Grid container>
                    <Grid item xs={4}>
                      <Zoom
                        in={mountImage}
                        style={{
                          transitionDelay: mountImage ? "500ms" : "0ms"
                        }}
                      >
                        {personImage ? (
                          <Avatar
                            alt="Remy Sharp"
                            src={`data:image/jpeg;base64,${personImage}`}
                            className={classes.bigAvatar}
                          />
                        ) : (
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                        )}
                      </Zoom>
                    </Grid>
                    <Grid item xs={8} style={{ padding: 10 }}>
                      <Card.Header className={classes.header}>
                        {personData &&
                          `${personData.name} ${personData.lastname}`}
                      </Card.Header>
                      <Card.Meta className={classes.meta}>
                        {personData
                          ? personData.discriminator === 0
                            ? t("employee")
                            : t("visitor")
                          : ""}
                      </Card.Meta>
                    </Grid>
                  </Grid>
                  <Card.Description style={{ padding: "0 15px" }}>
                    <List>
                      <List.Item>
                        <List.Icon name="id card" />
                        <List.Content>
                          {personData && personData.document
                            ? personData.document
                            : t("Unspecified")}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="mail" />
                        <List.Content>
                          {personData && personData.email ? (
                            <a href={`mailto:${personData.email}`}>
                              {personData.email}
                            </a>
                          ) : (
                            t("Unspecified")
                          )}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="phone" />
                        <List.Content>
                          {personData && personData.phone
                            ? personData.phone
                            : t("Unspecified")}
                        </List.Content>
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
              )}

              {!personId && (
                <Card.Content
                  style={{ padding: 0 }}
                  className={classes.content}
                >
                  <Grid container>
                    <Grid item xs={8} style={{ padding: 10, marginTop:10 }}>
                      <Card.Header className={classes.header}>
                        {t("UnassignedPerson")}
                      </Card.Header>
                    </Grid>
                  </Grid>
                </Card.Content>
              )}

              {personId && (
                <Card.Content extra className={classes.extraContent}>
                  <Divider className={classes.divider} />
                  <Card.Header className={classes.documentationHeader}>
                    <Icon name="file" />
                    {t("Documentation")}
                  </Card.Header>
                  <Divider className={classes.divider} />
                  <List divided verticalAlign="middle">
                    {this.props.documentPerson &&
                      this.props.documentPerson.data.map(doc => (
                        <List.Item>
                          <List.Content floated="right">
                            <PointIcon
                              style={
                                doc.status === 0
                                  ? { color: "#437043 " }
                                  : doc.status === 1
                                  ? { color: "#e66b00" }
                                  : { color: "#743631" }
                              }
                            />
                          </List.Content>
                          <List.Content>{doc.name}</List.Content>
                        </List.Item>
                      ))}
                  </List>
                </Card.Content>
              )}
            </Card>
          )}
        </Transition.Group>
      </React.Fragment>
    );
  }
}

const style = theme => ({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 70,
    height: 70,
    float: "left"
  },
  header: {
    fontSize: "1.1em"
  },
  card: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important",
    "& div": {
      color: "white !important"
    }
  },
  meta: {
    "&& ": { color: "#979494 !important" }
  },
  divider: {
    margin: "10px 0 !important"
  },
  documentationHeader: {
    fontSize: "1em !important"
  },
  content: {
    backgroundColor: theme.palette.background.main + "!important",
    "& *": {
      color: theme.palette.text.main + " !important"
    }
  },
  extraContent: {
    backgroundColor: theme.palette.background.main + " !important",
    "& *": {
      color: theme.palette.text.main + " !important"
    }
  }
});

const mapStateToProps = ({ Persons, Document }) => {
  return {
    personData: Persons.person,
    personImage: Persons.img,
    documentPerson: Document.personDocuments
  };
};

const mapDispatchToProps = {
  getPersonById: requestPersonById,
  getDocumentsPerson: createRequestGetDocumentByPersonId,
  getPersonImage: requestGetImage,
  clearStorePersonImage: requestClearStorePersonImage
};

const PersonInfoCardConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonInfoCard);

export default withTranslation()(
  withStyles(style, { withTheme: true })(PersonInfoCardConnected)
);
