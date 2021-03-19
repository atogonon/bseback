const {db} = require('./server/db')
const Papa = require('papaparse')
const Team = require('./server/db/models/Team')

// Data from Bbal Reference 19Mar2021

let string=`Rk,Team▲,G,MP,FG,FGA,FG%,3P,3PA,3P%,2P,2PA,2P%,FT,FTA,FT%,ORB,DRB,TRB,AST,STL,BLK,TOV,PF,PTS,ORTG,DRTG,PACE,imgURL,color
1,Atlanta Hawks,41,241.2,39.8,86.8,.458,12.7,34.9,.365,27.0,51.9,.521,20.7,25.2,.821,11.2,34.7,45.9,24.3,6.9,5.0,14.3,19.9,113.0,114.9,112.9,97.8,https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg,#E03A3E
2,Boston Celtics,40,240.6,41.5,88.3,.469,12.3,33.0,.371,29.2,55.3,.528,16.9,22.4,.756,11.2,32.7,43.9,22.6,8.0,5.2,14.0,20.9,112.1,114.1,113.2,98.0,https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg,#007A33
3,Brooklyn Nets,41,243.0,43.7,87.2,.501,15.0,37.0,.404,28.7,50.2,.572,18.2,22.8,.800,8.6,35.5,44.1,26.9,6.5,5.3,14.4,19.1,120.6,118.9,113.7,100.1,https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg,#000000
4,Charlotte Hornets,40,240.6,41.0,88.4,.464,13.9,36.2,.384,27.2,52.3,.520,16.5,21.2,.775,10.5,33.4,44.0,27.2,8.4,4.7,15.6,18.5,112.4,111.9,112.7,100.2,https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg,#1D1160
5,Chicago Bulls,39,241.9,42.8,89.1,.481,13.0,34.6,.375,29.8,54.4,.548,15.3,19.1,.804,9.3,35.4,44.7,26.3,6.8,4.4,15.9,20.0,114.0,111.9,111.9,101.1,https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg,#CE1141
6,Cleveland Cavaliers,40,243.1,39.2,86.7,.452,9.4,27.7,.340,29.8,59.1,.504,15.9,22.0,.724,11.2,31.9,43.1,23.2,8.2,5.2,15.8,19.2,103.6,105.2,113.6,97.2,https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg,#860038
7,Dallas Mavericks,39,240.6,40.3,86.3,.467,13.4,37.6,.356,26.9,48.6,.553,17.4,22.2,.784,8.3,34.5,42.8,22.6,6.3,4.6,12.4,19.9,111.4,113.5,113.4,97.9,https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg,#00538C
8,Denver Nuggets,40,243.1,43.5,89.3,.487,13.5,34.7,.388,30.0,54.6,.549,15.3,19.5,.784,10.2,33.9,44.1,26.8,8.2,4.3,13.5,19.1,115.7,117.6,112.0,97.1,https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg,#0E2240
9,Detroit Pistons,40,243.8,38.5,86.9,.443,12.5,35.7,.349,26.1,51.3,.508,18.0,23.4,.771,10.2,32.7,42.9,24.3,7.9,5.1,14.6,20.5,107.5,108.7,112.6,97.4,https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg,#C8102E
10,Golden State Warriors,41,240.6,41.1,88.7,.463,13.9,37.8,.367,27.3,51.0,.535,17.0,21.9,.775,7.9,35.2,43.0,27.8,8.0,4.8,15.0,21.9,113.0,109.5,109.8,103.0,https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg,#1D428A
11,Houston Rockets,39,240.6,38.5,88.8,.433,13.2,40.5,.326,25.3,48.3,.523,16.8,22.7,.740,9.1,33.4,42.5,22.1,8.0,5.5,14.5,20.1,106.9,104.8,111.5,101.7,https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg,#CE1141
12,Indiana Pacers,39,242.6,42.1,88.8,.473,12.1,33.5,.360,30.0,55.3,.542,16.4,20.8,.786,8.5,33.0,41.5,26.5,8.6,5.9,13.9,20.4,112.6,111.3,111.6,100.1,https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg,#002D62
13,Los Angeles Clippers,42,240.0,41.8,86.8,.482,14.4,34.7,.415,27.4,52.1,.526,16.5,19.6,.839,9.5,34.6,44.1,24.3,7.3,4.4,13.1,19.1,114.5,117.3,112.3,97.6,https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg,#C8102E
14,Los Angeles Lakers,41,243.0,42.0,86.5,.486,10.8,30.6,.354,31.2,56.0,.558,17.4,23.3,.749,9.8,35.6,45.4,24.9,7.3,6.0,15.1,19.0,112.4,112.2,106.1,98.9,https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg,#552583
15,Memphis Grizzlies,37,240.7,42.3,91.5,.463,10.5,30.1,.350,31.8,61.4,.518,15.9,20.3,.783,10.9,34.1,45.1,26.6,9.8,4.2,13.5,18.9,111.1,110.3,109.9,100.5,https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg,#5D76A9
16,Miami Heat,41,241.8,38.2,83.3,.459,12.7,36.6,.347,25.6,46.8,.546,17.1,21.6,.792,7.7,35.1,42.8,25.8,7.4,4.0,15.2,19.3,106.3,108.3,108.8,97.4,https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg,#98002E
17,Milwaukee Bucks,40,240.6,44.4,91.6,.485,14.5,37.5,.386,30.0,54.1,.554,16.2,21.6,.749,10.5,38.0,48.5,26.0,8.2,4.8,13.9,17.8,119.5,116.8,110.0,102.0,https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg,#00471B
18,Minnesota Timberwolves,41,241.8,40.6,91.6,.443,12.6,36.1,.349,28.0,55.5,.505,15.9,20.9,.760,10.5,32.7,43.2,25.1,8.7,5.7,14.5,21.7,109.7,107.2,114.6,101.6,https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg,#0C2340
19,New Orleans Pelicans,41,241.2,43.0,88.5,.485,11.3,31.7,.356,31.7,56.8,.557,18.2,24.9,.731,11.8,34.7,46.5,26.2,7.2,4.0,14.2,17.7,115.4,116.1,116.1,98.9,https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg,#0C2340
20,New York Knicks,42,240.0,38.9,85.9,.453,10.6,28.5,.372,28.3,57.3,.494,16.4,21.3,.771,10.3,35.7,46.0,21.0,6.8,4.6,13.5,20.6,104.8,109.1,109.2,96.1,https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg,#006BB6
21,Oklahoma City Thunder,41,241.8,39.0,87.1,.448,12.8,37.0,.346,26.2,50.1,.523,15.2,20.5,.744,8.0,36.3,44.3,22.8,6.9,4.4,14.7,18.2,106.0,105.1,111.2,100.1,https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg,#007AC1
22,Orlando Magic,40,240.6,38.6,89.7,.430,11.9,33.6,.353,26.7,56.2,.476,15.4,19.4,.790,10.6,36.1,46.7,22.6,6.8,4.2,13.4,16.9,104.3,105.4,112.4,98.7,https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg,#0077C0
23,Philadelphia 76ers,41,242.4,42.1,87.9,.479,10.8,29.3,.368,31.3,58.5,.534,20.2,25.7,.784,10.4,36.0,46.5,23.8,8.9,6.4,15.4,20.2,115.1,112.9,107.9,100.9,https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg,#006BB6
24,Phoenix Suns,39,242.6,42.8,87.5,.490,13.3,34.6,.384,29.5,52.8,.559,15.3,18.4,.831,8.2,35.1,43.3,27.2,6.6,4.3,13.3,19.8,114.2,116.0,109.7,97.4,https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg,#1D1160
25,Portland Trail Blazers,40,240.6,40.4,90.6,.446,16.2,42.4,.381,24.3,48.2,.504,17.8,21.3,.835,10.5,33.3,43.8,20.1,7.2,5.2,11.7,19.5,114.8,116.4,116.7,98.3,https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg,#E03A3E
26,Sacramento Kings,40,240.6,43.0,89.6,.480,11.9,33.2,.359,31.1,56.4,.551,17.0,23.4,.727,10.4,32.3,42.7,26.0,6.7,4.7,13.6,20.1,115.0,114.2,119.2,100.4,https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg,#5A2D81
27,San Antonio Spurs,37,241.4,41.4,90.6,.457,10.8,30.0,.361,30.6,60.6,.504,16.4,20.9,.785,9.1,35.2,44.3,24.8,7.2,5.1,11.3,17.2,110.1,110.2,110.2,99.3,https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg,#C4CED4
28,Toronto Raptors,40,240.0,39.5,88.2,.448,15.3,40.5,.378,24.2,47.7,.507,18.1,21.9,.826,9.4,31.9,41.3,25.1,8.4,5.6,13.6,22.0,112.5,112.8,112.5,99.7,https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg,#CE1141
29,Utah Jazz,40,240.6,41.3,88.3,.467,17.0,42.9,.397,24.2,45.4,.534,17.2,22.2,.778,11.0,36.8,47.8,23.7,6.5,5.4,14.5,19.0,116.8,117.6,109.6,99.0,https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg,#002B5C
30,Washington Wizards,40,240.6,41.6,89.9,.463,11.0,32.1,.344,30.6,57.8,.529,20.9,27.2,.767,9.2,34.5,43.7,24.9,7.5,3.5,14.2,22.1,115.2,109.9,114.6,104.5,https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg,#002B5C
,League Average,40,241.4,41.1,88.3,.465,12.8,34.8,.367,28.3,53.5,.529,17.1,21.9,.778,9.8,34.5,44.3,24.7,7.6,4.9,14.1,19.6,112.0,112.0,112.0,99.4`

let bbrefData=Papa.parse(string).data
bbrefData.shift()
let seedTeams = []
let nets=bbrefData[2], league=bbrefData.pop()
bbrefData.splice(2, 1)
bbrefData.unshift(nets)
bbrefData.unshift(league)

bbrefData.forEach(team => {
  let obj={
    team: team[1],
    g: team[2],
    mp: team[3],
    fg: team[4],
    fga: team[5],
    fgp: team[6],
    thr: team[7],
    thrA: team[8],
    thrP: team[9],
    two: team[10],
    twoA: team[11],
    twoP: team[12],
    ft: team[13],
    ftA: team[14],
    ftP: team[15],
    orb: team[16],
    drb: team[17],
    trb: team[18],
    ast: team[19],
    stl: team[20],
    blk: team[21],
    tov: team[22],
    pf: team[23],
    pts: team[24],
    ortg: team[25],
    drtg: team[26],
    pace: team[27],
    imgURL: team[28],
    color: team[29]
  }

  seedTeams.push(obj)
})



const seed = async () => {
  await db.sync({force: true})

  await db.sync({force:true})

  await Promise.all(seedTeams.map(team => {
    return Team.create(team)
  }))

  console.log('Seeding success!')
  db.close()
}

seed()
  .catch(err => {
    console.error('Seeding error!')
    console.error(err)
    db.close()
  })
