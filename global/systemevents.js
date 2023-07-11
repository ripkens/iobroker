const EventListDestination = "0_userdata.0.SystemEventList.";

createState(EventListDestination + "EventList", "", false, { read: true, write: true, name: "Event-Liste", type: "string", role: "text", def: "" });
createState(EventListDestination + "NextEventId", 0, false, { read: true, write: true, name: "Nächste Event-Id", type: "number", def: 0 });

 
const maxEventCount = 500;
  
function CreateEventlog(EventType, EventText) {
  let EventList = getState(EventListDestination + "EventList").val;
   
  // Nur die letzten x Einträge im Script belassen
  let eventList = EventList.split('<br>');
  let eventCount = eventList.length;
  let newEventList = "";
 
  for (var i = 0; i < eventCount; i++) {
    if ( i < (maxEventCount-1) ) {
      newEventList = newEventList + "<br>" + eventList[i];
    } else {
      break;
    }
  }
   
  EventList = newEventList;
  
  // Neue Event-Id und Zeitpunkt ermitteln
  let EventId = getState(EventListDestination + "NextEventId").val;
  let EventDateTime = formatDate(getDateObject((new Date().getTime())), "TT.MM.JJ hh:mm:ss");
  
  EventId = EventId + 1;
  setState(EventListDestination + "NextEventId", EventId);
    
  let FormatedEventId = ("00000" + EventId).slice(-5);
  let EventLog = FormatedEventId + " - " + EventDateTime + " - " + EventType + " - " + EventText;
  EventList = EventLog + EventList;
    
  setState(EventListDestination + "EventList", EventList);
}

