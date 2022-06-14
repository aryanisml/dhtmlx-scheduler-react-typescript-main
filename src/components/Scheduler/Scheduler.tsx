
import React, {  useCallback, useEffect } from "react";
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
import './Scheduler.css';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_timeline.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_daytimeline.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_treetimeline.js';
import { ContextMenu } from 'dhx-suite';
import 'dhx-suite/codebase/suite.min.css';

const windowInstance :any = window;
const scheduler = windowInstance.scheduler;
const ContextMenuData = [{
  id :1,
  value : 'File',
  items : [{
      id : 2,
      value : 'Create'
  }]
}, {
  id : 3,
  value : 'Show'
}]
const menu = new ContextMenu(undefined, { navigationType: 'click' });
const Scheduler = (props: any) => {
  const { onDataUpdated, events, timeFormatState } = props;
  menu?.data?.parse(ContextMenuData);
  //const schedulerRef = useRef();
  const schedulerRef = useCallback((node: any) => {
    if (node !== null) {
  
      console.log(node);
     
      scheduler.clearAll();
      scheduler.skin = "material";
      scheduler.config.header = [
        "day",
        "week",
        "month",
        "timeline",
        "date",
        "prev",
        "today",
        "next"
      ];
      scheduler.createTimelineView({
        name:      "timeline",
        x_unit:    "minute",
        x_date:    "%H:%i",
        x_step:    30,
        x_size:    24,
        x_start:   16,
        x_length:  48,
        y_unit:[   
           {key:1, label:"A"},
           {key:2, label:"B"},
           {key:3, label:"C"},
           {key:4, label:"D"}  
        ],
        y_property: "section_id",
        render:    "bar"
   });
      scheduler.config.hour_date = "%g:%i %A";
      scheduler.xy.scale_width = 70;
      initSchedulerEvents();
      scheduler.init(node, new Date());
      scheduler.parse(events);
      scheduler.render();

      setHoursScaleFormat(timeFormatState);
    }
  }, []);

  const initSchedulerEvents = () => {
    if (scheduler._$initialized) {
      return;
    }

    
    scheduler.attachEvent(
      'onContextMenu',
      (eventid: any, nativeeventobject: any) => {
        if (eventid) {
          const ev = scheduler.getEvent(eventid);
          if (ev.appointmentType !== 'UN') {
            let posx = 0;
            let posy = 0;
            if (nativeeventobject.pageX || nativeeventobject.pageY) {
              posx = nativeeventobject.pageX;
              posy = nativeeventobject.pageY;
            } else if (nativeeventobject.clientX || nativeeventobject.clientY) {
              posx =
                nativeeventobject.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft;
              posy =
                nativeeventobject.clientY +
                document.body.scrollTop +
                document.documentElement.scrollTop;
            }
            menu.showAt(nativeeventobject);
            return false;
          }
        }
        return true;
      },
    );

    scheduler.attachEvent("onEventAdded", (id :any, ev :any) => {
      if (onDataUpdated) {
        onDataUpdated("create", ev, id);
      }
    });

    scheduler.attachEvent("onEventChanged", (id:any, ev:any) => {
      if (onDataUpdated) {
        onDataUpdated("update", ev, id);
      }
    });

    scheduler.attachEvent("onEventDeleted", (id:any, ev:any) => {
      if (onDataUpdated) {
        onDataUpdated("delete", ev, id);
      }
    });

    scheduler._$initialized = true;
  };

  const setHoursScaleFormat = (state:any) => {
    scheduler.config.hour_date = state ? "%H:%i" : "%g:%i %A";
    scheduler.templates.hour_scale = scheduler.date.date_to_str(
      scheduler.config.hour_date
    );
  };

  useEffect(() => {
    console.log(scheduler);
    console.log(schedulerRef);
  }, []);

  // useEffect(() => {
  //   let timer: any = null;
  //   document.addEventListener("DOMContentLoaded", function (event) {
  //     window.addEventListener("touchstart", touchstart, false);
  //     window.addEventListener("touchend", touchend, false);
  //   });

  //   const onlongtouch = (e: any) => {
  //     timer = null;
  //     menu.showAt(e);
  //     scheduler.tooltip.hide();
  //   }
  //   const touchstart = (e: any) => {
  //     if (!timer) {
  //       timer = setTimeout(function () { onlongtouch(e) }, 800);
  //     }
  //   }
  //   function touchend() {
  //     if (timer) {
  //       clearTimeout(timer);
  //       timer = null;
  //     }
  //   }
  // }, [])

  return (
    <div className="scheduler-container">
      <div ref={schedulerRef} style={{ width: "100%", height: "600px" }} >
      </div>
    </div>
  );
};

export default React.memo(Scheduler, (props, nextProps) => {
  return props.timeFormatState !== nextProps.timeFormatState;
});

