import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek
} from "date-fns";

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1))
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  }
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const getDefaultStaticRanges = t => {
  return createStaticRanges([
    {
      label: t("CurrentDay"),
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday
      }),
    },
    {
      label: t("LastDay"),
      range: () => ({
        startDate: defineds.startOfYesterday,
        endDate: defineds.endOfYesterday
      })
    },

    {
      label: t("CurrentWeek"),
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek
      })
    },
    {
      label: t("LastWeek"),
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek
      })
    },
    {
      label: t("CurrentMonth"),
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth
      })
    },
    {
      label: t("LastMonth"),
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth
      })
    }
  ]);
};

export const getDefaultInputRanges = t => {
  return [
    {
      label: t("DaysUntilToday"),
      range(value) {
        return {
          startDate: addDays(
            defineds.startOfToday,
            (Math.max(Number(value), 1) - 1) * -1
          ),
          endDate: defineds.endOfToday
        };
      },
      getCurrentValue(range) {
        if (!isSameDay(range.endDate, defineds.endOfToday)) return "-";
        if (!range.startDate) return "∞";
        return (
          differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1
        );
      }
    }
  ];
};
