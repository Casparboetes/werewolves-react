import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'
import MoveAllToVillage from '../components/games/MoveAllToVillage'
import Email from '../images/email.png'
import MayorMedal from '../images/mayor-medal.png'
import Cross from '../images/cross.png'
import {Card, CardActions, CardHeader,  CardTitle} from 'material-ui/Card';
import './Village.css'


const setClassName = ( mayor, receivedMessages) => {
if (mayor) {
    return 'mayor'
  }
  if ( receivedMessages.length < 0){
    return ''

  } else if (receivedMessages.length > 0){
    return 'Email'
  }
}


class Village extends PureComponent {


  renderPlayer(player, index) {


     let unreadMessages = player.receivedMessages.filter(function(message){
       return message.messageRead === false
     })

     return(
       <div key={index} >
         <Card id="body" className={setClassName( player.mayor, player.receivedMessages)}>
           <CardHeader
             title={player.name}
             subtitle={ player.dead ? <img src={Cross} className="cross" alt="cross" /> : ''}
           />
           <CardHeader
             title={ player.receivedMessages.length && unreadMessages.length > 0 && player.dead === false ? <img src={Email} className="Email" alt="Email" /> : ''}
             subtitle= { player.mayor && player.dead === false ? <img src={MayorMedal} className="medal" alt="MayorMedal" /> : ''}
             children={<PlayerDialog player={player}/> }
           />
           <CardActions>
             { player.mayor ? 'Mayor' : '' }
             { player.dead ? 'Dead' : '' }
             { player.messageSent === 'sent' ? 'Message sent' : '' }
           </CardActions>
       </Card>
     </div>
   )
  }

render() {
  return (
    <div>
      <MoveAllToVillage players={this.props.players}/>
      <div>{ this.props.players.map(this.renderPlayer) }</div>
    </div>
  )
}
}

export default Village
