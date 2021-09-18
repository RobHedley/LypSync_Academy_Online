import React, { useState, useEffect,  Fragment} from 'react'
import styles from './Bookings.module.scss'
import Grid from '@material-ui/core/Grid';
import Spinner from '../../atoms/spinner/Spinner'

import { OAuthClient} from "@timetreeapp/web-api";


const initialFormState = { 
  name: '', 
  description: '', 
  category: '', 
  courseLevel: '', 
  cpdNo: '',
  assessment: '',
  coursework: ''
 }

const Bookings = () => {

  const [token] = useState("RtYOWbJGSVL0w_vt440G51nReKpJNmYkKKwnRDhOWluE2vSK");
  const [user, setUser] = useState(null);
  const [calendarID, setCalendarID] = useState(null);
  const [todayEvents, setTodayEvents] = useState(null);

  const getAttendees = (attendees, members) => {
    if (members === null) return

    let attendeesArray = [];
    attendees.map((person) => {
      if(members.find( ({ id }) => id === person.id)){
        const attendee = members.find( ({ id }) => id === person.id)
        attendeesArray.push(attendee.name)
      }
    })
    return attendeesArray
  }

  const appointmentAnalyse = (fulltext) => {
    console.log('text', fulltext)
    const stringArray = fulltext.split(' ');
    // eslint-disable-next-line array-callback-return
    let aiString = ''
    const lipArray = ['lips', 'lip'];
    const volArray = ['0.5', '1.0', '1.1ml', '2.0',  '2.2', '3.0', '4.0', '5.0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
    
    stringArray.map(text => {
      if(lipArray.includes(text)){
        //find amount
        const volume = stringArray.map(amount => {
          console.log('amount', amount)
          let vol = null;
          if(volArray.includes(amount)){
            vol = amount;
          }
          console.log('vol', vol)
          return vol
        })
        
        //Russian
        const russian = (text.includes('russian')) ? true : false;
        aiString += `Lips - ${volume} - ${russian?'Russian': ''}`
      }
    })
    
    console.log('return', aiString)
    return aiString;
  }

  const getCalendar = React.useCallback(() => {
    const client = new OAuthClient(token);
    client.getUser().then((u) => {
      setUser(u.name);
    });
    client.getCalendars().then((c) => {
      const calId = c[0].id;
      if (calId !== null){
        setCalendarID(calId);
        client.getCalendar(calId).then((e) => {
           console.log('Calendar', e.name);
        });
        client.getMembers(calId).then((members) => {
          client.getUpcomingEvents({'calendarId': calId, 'days': 7}).then((today) => {
            // console.log('Upcoming', today);
            let todayArray = [];
            // eslint-disable-next-line array-callback-return
            today.map((event, index) => {
              const fromTime = new Date(event.startAt).toLocaleTimeString();
              const toTime = new Date(event.endAt).toLocaleTimeString();
              todayArray.push(<div key={index}>{fromTime} - {toTime} {event.title} - {getAttendees(event.attendees, members)} - {appointmentAnalyse(event.title)}</div>)
            })
            setTodayEvents(todayArray);
          });
        });
      }
    });

  }, [token]);

  useEffect(() => {
    getCalendar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <Fragment>
    <div className={styles.outer}>
      <Grid item xs={12} md={12}>
        <div>
          {!todayEvents && <Spinner />}
          {todayEvents}
      </div>
      </Grid>
    </div>
  </Fragment>
  );
}

export default Bookings

