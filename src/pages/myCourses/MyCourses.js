import React, { useState, Fragment} from 'react'
import styles from './MyCourses.module.scss'

import HeaderBar from '../../components/atoms/headerBar/HeaderBar'

const MyCourses = () => {
  const [selectedState, setselectedState] = useState('National')
  

    return (
    <Fragment>
      <header className="App-header">
        <HeaderBar />
      </header>
      <div className="ContentLeft">
        {/* <SideBar position={'left'} wide={true}>
        <p className={styles.explanation}></p>
          <DropDown options={getStateOptions()} onChange={handleChange}/>
          {stateLevel &&
            <LayerControl data={getStateData(masterFile)} selectedState={selectedState} />
          }
          <OverlayControl data={getOverlayData(masterFile)} />
        </SideBar> */}
        Left Bar
      </div>
      <div className="ContentRight">
        {/* <SideBar position={'right'} wide={true}>
          <StatsPanel masterFile={masterFile} selectedState={selectedState} />
        </SideBar> */}
        right bar
      </div>
    </Fragment>
    );
}

export default MyCourses

