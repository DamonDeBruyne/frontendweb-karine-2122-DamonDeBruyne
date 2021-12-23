const GROUPS_DATA = [
  { id: '7f28c5f9-d711-4cd6-ac15-d13d71abff86',name: 'groep 1'},
  { id: '7f28c5f9-d711-4cd6-ac15-d13d71abff87',name: 'groep 2'},
  { id: '7f28c5f9-d711-4cd6-ac15-d13d71abff88',name: 'groep 3'},
];
const POST_DATA=[
  { 
    id:'7f28c5f9-d711-4cd6-ac15-d13d71abff83',
    user_id:'7f28c5f9-d711-4cd6-ac15-d13d71abff80' ,
    group_id:'7f28c5f9-d711-4cd6-ac15-d13d71abff86',
    description:'dit is een post',
    post_date:new Date(2021,4,2,19,20) 
  },
  { 
    id:'7f28c5f9-d711-4cd6-ac15-d13d71abff84',
    user_id:'7f28c5f9-d711-4cd6-ac15-d13d71abff81' ,
    group_id:'7f28c5f9-d711-4cd6-ac15-d13d71abff86',
    description:'dit is een andere post',
    post_date:new Date(2021,4,19,9,12) 
  },
  { 
    id:'7f28c5f9-d711-4cd6-ac15-d13d71abff85',
    user_id:'7f28c5f9-d711-4cd6-ac15-d13d71abff80' ,
    group_id:'7f28c5f9-d711-4cd6-ac15-d13d71abff87',
    description:'dit is geen post, grapje',
    post_date:new Date(2021,6,12,15,13) 
  },
];
const USER_DATA=[
  {
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
    name: 'Damon De Bruyne',
    email: 'damon.debruyne@student.hogent.be',
    password_hash:
    '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
    roles: JSON.stringify(["ADMIN", "USER"]),
  },
  {
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abff81',
    name: 'Yorben Depotter',
    email: 'yorben.depotter@student.hogent.be',
    password_hash:
    '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
    roles: JSON.stringify(["USER"]),
  },
]
export {GROUPS_DATA,POST_DATA,USER_DATA};