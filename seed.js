const {db} = require('./server/db')
const Papa = require('papaparse')
const Team = require('./server/db/models/Team')

let string=`Rk,Team▲,G,MP,FG,FGA,FG%,3P,3PA,3P%,2P,2PA,2P%,FT,FTA,FT%,ORB,DRB,TRB,AST,STL,BLK,TOV,PF,PTS,imgURL,color
1,Atlanta Hawks,39,241.3,39.5,86.7,.455,12.6,34.8,.363,26.8,51.9,.517,21.2,25.8,.820,11.3,34.6,45.9,24.1,6.8,4.9,14.4,20.0,112.7,https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg,#E03A3E
2,Boston Celtics,38,240.7,41.3,88.1,.469,12.4,33.0,.375,28.9,55.1,.526,17.2,22.7,.758,11.0,33.0,44.0,22.5,8.0,5.1,14.1,20.8,112.2,https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg,#007A33
3,Brooklyn Nets,39,243.2,43.7,87.6,.499,15.2,37.5,.405,28.5,50.1,.570,17.9,22.4,.802,8.6,35.4,44.1,26.9,6.5,5.4,14.3,19.1,120.6,https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg,#000000
4,Charlotte Hornets,37,240.7,41.1,88.6,.463,14.1,36.5,.385,27.0,52.1,.518,16.4,21.0,.781,10.7,33.5,44.2,27.2,8.3,4.7,15.7,18.6,112.5,https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg,#1D1160
5,Chicago Bulls,37,242.0,42.8,88.8,.481,13.1,34.6,.378,29.7,54.2,.548,15.5,19.4,.802,9.1,35.5,44.6,26.4,6.8,4.5,16.0,20.0,114.1,https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg,#CE1141
6,Cleveland Cavaliers,38,243.3,39.1,87.1,.450,9.4,27.6,.340,29.8,59.5,.500,15.8,21.9,.720,11.2,32.0,43.2,23.2,8.2,5.3,15.8,19.2,103.4,https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg,#860038
7,Dallas Mavericks,37,240.7,40.4,86.6,.466,13.3,37.6,.352,27.1,49.0,.553,17.9,22.9,.783,8.5,34.6,43.1,22.8,6.2,4.6,12.1,20.1,111.9,https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg,#00538C
8,Denver Nuggets,38,243.3,43.2,89.0,.485,13.4,34.6,.386,29.8,54.4,.548,15.4,19.7,.784,10.1,33.6,43.7,26.4,8.1,4.3,13.4,19.1,115.2,https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg,#0E2240
9,Detroit Pistons,38,243.9,38.5,87.3,.441,12.6,36.1,.349,25.9,51.2,.506,17.9,23.1,.773,10.2,32.6,42.8,24.4,7.8,5.1,14.6,20.6,107.5,https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg,#C8102E
10,Golden State Warriors,39,240.6,41.3,88.9,.464,13.8,37.6,.368,27.5,51.4,.535,17.2,22.1,.777,7.9,35.4,43.3,27.7,8.1,4.9,14.8,21.8,113.6,https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg,#1D428A
11,Houston Rockets,37,240.7,38.5,89.1,.432,13.4,41.0,.326,25.1,48.0,.523,16.8,22.5,.750,9.1,33.4,42.5,22.1,8.1,5.6,14.5,20.2,107.2,https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg,#CE1141
12,Indiana Pacers,37,242.7,42.1,88.9,.473,12.0,33.3,.361,30.1,55.6,.541,16.4,20.9,.785,8.5,33.2,41.7,26.4,8.6,5.9,13.9,20.4,112.7,https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg,#002D62
13,Los Angeles Clippers,40,240.0,41.9,86.8,.483,14.5,34.8,.417,27.4,52.0,.526,16.9,20.1,.843,9.5,34.7,44.2,24.4,7.2,4.6,13.3,19.4,115.2,https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg,#C8102E
14,Los Angeles Lakers,38,243.3,41.6,86.6,.480,10.7,30.6,.350,30.9,56.1,.551,17.3,23.2,.746,9.8,35.5,45.3,24.4,7.3,6.1,15.1,19.0,111.2,https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg,#552583
15,Memphis Grizzlies,35,240.7,42.8,91.8,.466,10.7,30.0,.357,32.1,61.8,.519,15.7,20.0,.787,11.1,34.1,45.1,27.1,9.9,4.4,13.7,19.0,112.1,https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg,#5D76A9
16,Miami Heat,39,241.9,38.3,83.2,.461,12.9,36.9,.349,25.4,46.3,.550,17.2,21.7,.791,7.5,34.9,42.4,25.9,7.4,3.9,15.3,19.3,106.6,https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg,#98002E
17,Milwaukee Bucks,38,240.0,44.3,91.3,.486,14.7,37.7,.390,29.6,53.6,.553,16.1,21.6,.744,10.5,37.8,48.3,26.0,8.1,4.9,13.7,17.9,119.4,https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg,#00471B
18,Minnesota Timberwolves,39,241.9,40.4,91.6,.441,12.7,36.2,.351,27.7,55.4,.500,15.6,20.5,.764,10.5,33.0,43.5,25.2,8.5,5.7,14.6,21.8,109.1,https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg,#0C2340
19,New Orleans Pelicans,39,241.3,43.1,88.7,.486,11.2,31.6,.355,31.9,57.1,.559,18.3,25.0,.731,11.9,34.8,46.7,25.9,7.2,4.1,14.2,17.5,115.7,https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg,#0C2340
20,New York Knicks,39,240.0,39.1,85.8,.455,10.5,28.2,.372,28.6,57.6,.496,16.6,21.4,.775,10.4,35.8,46.3,21.2,6.7,4.7,13.8,20.7,105.2,https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg,#006BB6
21,Oklahoma City Thunder,39,241.9,39.1,86.8,.450,12.9,37.5,.345,26.1,49.3,.529,15.4,20.8,.742,7.8,36.7,44.5,23.1,6.8,4.3,14.8,18.4,106.5,https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg,#007AC1
22,Orlando Magic,39,240.6,38.6,89.9,.430,11.9,33.5,.355,26.7,56.4,.475,15.4,19.5,.790,10.6,36.0,46.6,22.6,6.8,4.1,13.5,16.9,104.6,https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg,#0077C0
23,Philadelphia 76ers,39,241.9,42.2,87.3,.483,10.7,29.0,.370,31.5,58.3,.540,20.7,26.4,.786,10.3,35.7,46.1,23.8,8.7,6.3,15.4,20.1,115.8,https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg,#006BB6
24,Phoenix Suns,37,242.7,42.6,87.6,.487,13.3,34.7,.383,29.4,52.9,.555,15.3,18.4,.832,8.3,34.9,43.2,27.2,6.6,4.2,13.1,19.5,113.9,https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg,#1D1160
25,Portland Trail Blazers,38,240.7,40.7,91.1,.446,16.2,42.3,.382,24.5,48.8,.503,17.3,20.9,.828,10.6,33.3,43.9,20.3,7.1,5.0,11.5,19.5,114.9,https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg,#E03A3E
26,Sacramento Kings,38,240.7,42.9,89.6,.479,12.1,33.2,.363,30.9,56.4,.548,16.8,23.2,.724,10.7,32.1,42.8,26.0,6.6,4.7,13.7,20.0,114.8,https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg,#5A2D81
27,San Antonio Spurs,35,241.4,41.3,90.9,.455,10.9,30.1,.361,30.5,60.7,.501,16.7,21.1,.788,8.9,35.3,44.2,24.9,7.4,5.0,11.1,17.3,110.2,https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg,#C4CED4
28,Toronto Raptors,39,240.0,39.6,88.3,.449,15.4,40.5,.380,24.2,47.7,.507,17.9,21.6,.829,9.4,32.2,41.5,25.1,8.4,5.5,13.7,21.9,112.5,https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg,#CE1141
29,Utah Jazz,38,240.7,41.3,88.3,.467,16.9,42.8,.396,24.3,45.5,.534,17.1,21.9,.781,11.1,37.1,48.1,23.9,6.4,5.4,14.3,18.8,116.6,https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg,#002B5C
30,Washington Wizards,37,240.7,41.3,89.9,.459,11.2,32.5,.344,30.1,57.5,.524,20.6,27.0,.765,9.4,34.4,43.8,24.7,7.7,3.6,14.2,21.9,114.4,https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg,#002B5C
,League Average,38,241.4,41.1,88.4,.465,12.8,34.9,.368,28.2,53.5,.528,17.1,22.0,.778,9.8,34.5,44.3,24.7,7.5,4.9,14.1,19.6,112.1`

let bbrefData=Papa.parse(string).data
bbrefData.shift()
let seedTeams = []
let nets=bbrefData[2], league=bbrefData.pop()
bbrefData.splice(2, 1)
bbrefData.unshift(nets)
bbrefData.unshift(league)

for (let i=0; i<bbrefData.length; i++) {
  let team=bbrefData[i]

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
    imgURL: team[25],
    color: team[26]
  }

  seedTeams.push(obj)
}

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
