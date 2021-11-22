

export default function getMyStats(player, matches){
    let stats = {wins: 0, loss: 0, difference: 0, rating: 1500, winP: 0, streak: 0, longestStreak: 0, gamesPlayed: 0, screensFor: 0, screensAgainst: 0};
    let myMatches = matches.filter(el => player.matches.indexOf(el._id)!==-1);

    //Filtering matches into blue and red
    let blueMatches = myMatches.filter(m => m.teams.blue.players[0]._id === player._id || m.teams.blue.players[1]._id === player._id );
    let redMatches = myMatches.filter(m => m.teams.red.players[0]._id === player._id || m.teams.red.players[1]._id === player._id );

    //Adding wins, loss and rating
    blueMatches.forEach(m => {
      m.teams.blue.score === 10 ? stats.wins++ : stats.loss++;
      stats.rating += m.teams.blue.adjustment;
    } );
    redMatches.forEach(m => {
      m.teams.red.score === 10 ? stats.wins++ : stats.loss++;
      stats.rating += m.teams.red.adjustment; 
    });

    //Adding win percentage
    if(stats.wins === 0 && stats.loss ===0){
      stats.winP = 0
    }
    else{
      stats.winP = (stats.wins / (stats.wins + stats.loss)) * 100;
    }
     stats.winP = stats.winP.toFixed();

     //Calculate streak and screens
     myMatches.forEach(m => {
      let team = (m.teams.blue.players[0]._id === player._id) || (m.teams.blue.players[1]._id === player._id) ? "blue" : "red";
      if(team === "blue"){
        stats.difference += (m.teams.blue.score - m.teams.red.score);
        stats.streak = m.teams.blue.score === 10 ? stats.streak + 1 : 0;
        stats.screensFor = m.teams.blue.score === 10 && m.teams.red.score === 0 ? stats.screensFor + 1 : stats.screensFor;
        stats.screensAgainst = m.teams.blue.score === 0 && m.teams.red.score === 10 ? stats.screensAgainst + 1 : stats.screensAgainst;
      }
      else{
        stats.difference += (m.teams.red.score - m.teams.blue.score);
        stats.streak = m.teams.red.score === 10 ? stats.streak + 1 : 0;
        stats.screensFor = m.teams.red.score === 10 && m.teams.blue.score === 0 ? stats.screensFor + 1 : stats.screensFor;
        stats.screensAgainst = m.teams.red.score === 0 && m.teams.blue.score === 10 ? stats.screensAgainst + 1 : stats.screensAgainst;
      }
      stats.longestStreak = stats.streak > stats.longestStreak ? stats.streak : stats.longestStreak;
     })

     //Adding games played
     stats.gamesPlayed = myMatches.length;

     return stats
     
  }