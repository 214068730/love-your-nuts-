import React, { useState, useEffect, useRef, Fragment } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './assets/css/app.scss'

const publisherUrl = 'https://data.iol.io/cupevents/soccer/'

function getDate (string) {
  let fullDayName = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
    'Sun': 'Sunday'
  }
  let date = new Date(string).toString()
  let dayName = fullDayName[date.substr(0, 3)]
  let month = date.substr(4, 3)
  let dd = date.substr(8, 2)
  let time = date.substr(16, 5)
  return { 'date': dayName + ', ' + dd + ' ' + month, 'time': time }
}

const FinishedGame = ({ game }) => (
  <div className='soccer-widget'>
    <h3>{getDate(game.start).date} - <strong>{getDate(game.start).time}</strong></h3>
    <p><small>{game.venue}</small></p>
    <div className='inner'>
      <div className='third'>
        <img src={game.teamOne.logo} alt='Country Name' /><br />
        {game.teamOne.name}
      </div>
      <div className='third score'>
        <span>{game.teamOne.score} : {game.teamTwo.score}</span>
        {game.status === 'FT_PEN' ? (
          <span>PEN ({game.teamOne.pen_score} : {game.teamTwo.pen_score})</span>
        ) : (<span className='red-text'>{game.status}</span>)}
      </div>
      <div className='third'>
        <img src={game.teamTwo.logo} alt='Country Name' /><br />
        {game.teamTwo.name}
      </div>
    </div>
    <div className='inner'>
      <div className='half'>
        {Array.isArray(game.teamOne.players) && game.teamOne.players.length ? (
          game.teamOne.players.map((player, index) => {
            return (<div key={index}>{player.name}, {player.minutes}</div>)
          }))
          : (
            <Fragment>
              <div>
                <div />
              </div>
            </Fragment>
          )
        }
      </div>
      <div className='half text-right'>
        {Array.isArray(game.teamTwo.players) && game.teamTwo.players.length ? (
          game.teamTwo.players.map((player, index) => {
            return (<div key={index}>{player.name}, {player.minutes}</div>)
          }))
          : (
            <Fragment>
              <div>
                <div />
              </div>
            </Fragment>
          )
        }
      </div>
    </div>
    <div className='inner bottom'>
      <small>
        <strong>Referees:</strong>
        {game.referees}
      </small>
    </div>
  </div>
)

const UpComingGame = ({ game, refs }) => (
  <div className='soccer-widget' ref={refs}>
    <h3>{getDate(game.start).date} - <strong>{getDate(game.start).time}</strong></h3>
    <p><small>{game.venue}</small></p>
    <div className='inner'>
      <div className='third'>
        <img src={game.teamOne.logo} alt='Country Name' /><br />
        {game.teamOne.name}
      </div>
      <div className='third score'>
        <span>VS</span>
      </div>
      <div className='third'>
        <img src={game.teamTwo.logo} alt='Country Name' /><br />
        {game.teamTwo.name}
      </div>
    </div>
    <div className='inner'>
      <div className='half'>
        {Array.isArray(game.teamOne.players) && game.teamOne.players.length ? (
          game.teamOne.players.map((player, index) => {
            return (<div key={index}>{player.name}, {player.minutes}</div>)
          }))
          : (
            <Fragment>
              <div>
                <div />
              </div>
            </Fragment>
          )
        }
      </div>
      <div className='half text-right'>
        {Array.isArray(game.teamTwo.players) && game.teamTwo.players.length ? (
          game.teamTwo.players.map((player, index) => {
            return (<div key={index}>{player.name}, {player.minutes}</div>)
          }))
          : (
            <Fragment>
              <div>
                <div />
              </div>
            </Fragment>
          )
        }
      </div>
    </div>
    <div className='inner bottom'>
      <small>
        <strong>Referees:</strong>
        {game.referees}
      </small>
    </div>
  </div>
)

const LiveGame = ({ game, refs }) => (
  <div className='soccer-widget' ref={refs}>
    <h3>{getDate(game.start).date} - <strong>{getDate(game.start).time}</strong></h3>
    <p><small>{game.venue}</small></p>
    <div className='inner'>
      <div className='third'>
        <img src={game.teamOne.logo} alt='Country Name' /><br />
        {game.teamOne.name}
      </div>
      <div className='third score'>
        <span>{game.teamOne.score} : {game.teamTwo.score}</span>
        <span className='red-text'>{game.status}</span>
      </div>
      <div className='third'>
        <img src={game.teamTwo.logo} alt='Country Name' /><br />
        {game.teamTwo.name}
      </div>
    </div>
    <div className='inner'>
      <div className='half'>
        {Array.isArray(game.teamOne.players) && game.teamOne.players.length ? (
          game.teamOne.players.map((player, index) => {
            return (<div key={index}>{player.name}, {player.minutes}</div>)
          }))
          : (
            <Fragment>
              <div>
                <div />
              </div>
            </Fragment>
          )
        }
      </div>
      <div className='half text-right'>
        {Array.isArray(game.teamTwo.players) && game.teamTwo.players.length ? (
          game.teamTwo.players.map((player, index) => {
            return (<div key={index}>{player.name}, {player.minutes}</div>)
          }))
          : (
            <Fragment>
              <div>
                <div />
              </div>
            </Fragment>
          )
        }
      </div>
    </div>
    <div className='inner bottom'>
      <small>
        <strong>Referees:</strong>
        {game.referees}
      </small>
    </div>
  </div>
)

function CricketMatches () {
  const containerRef = useRef(null)
  const liveGameRef = useRef(null)
  const upComingGameRef = useRef(null)

  const [matches, setMatches] = useState([])

  // Fetch initial data
  useEffect(() => {
    axios // https://data.iol.io/cupevents/cricket/allMatches/afcon
      .get(publisherUrl + 'allMatches/afcon')
      .then(result => setMatches(
        result.data.finishedMatches.concat(
          result.data.liveMatches.concat(
            result.data.upcomingMatches
          )
        )
      ))
  }, [])

  // Position the div at the first live or upcoming game
  useEffect(() => {
    if (containerRef) {
      if (liveGameRef.current) {
        containerRef.current.scrollTo(liveGameRef.current.offsetLeft - containerRef.current.offsetLeft, 0)
      } else if (upComingGameRef.current) {
        containerRef.current.scrollTo(upComingGameRef.current.offsetLeft - containerRef.current.offsetLeft, 0)
      }
    }
  }, [containerRef.current])

  // Refresh data every 30 seconds
  useEffect(() => {
    let interval = setInterval(() => {
      axios // https://data.iol.io/cupevents/cricket/allMatches/afcon
        .get(publisherUrl + 'allMatches/afcon')
        .then(result => setMatches(
          result.data.finishedMatches.concat(
            result.data.liveMatches.concat(
              result.data.upcomingMatches
            )
          )
        ))
    }, 30 * 1000)

    // Clean up, once done
    return () => {
      clearInterval(interval)
    }
  }, [])

  let firstNS = true
  let firstLive = true
  return (
    <div className='scroller' ref={containerRef}>
      {Array.isArray(matches) && matches.length ? (
        matches.map((game, index) => {
          switch (game.status) {
            case 'FT':
            case 'CANCL':
            case 'POSTP':
            case 'ABAN':
            case 'SUSP':
            case 'FT_PEN':
            case 'INT':
              return <FinishedGame game={game} key={index} />
            case 'NS': if (firstNS) {
              firstNS = false
              return <UpComingGame refs={upComingGameRef} game={game} key={index} />
            } else {
              return <UpComingGame game={game} key={index} />
            }
            default: if (firstLive) {
              firstLive = false
              return <LiveGame game={game} key={index} refs={liveGameRef} />
            } else {
              return <LiveGame game={game} key={index} />
            }
          }
        }))
        : (
          <Fragment>
            <div className='dots'>
              <div />
              <div />
              <div />
            </div>
          </Fragment>
        )
      }
    </div>
  )
}

ReactDOM.render(<CricketMatches />, document.getElementById('soccerWidget'))
