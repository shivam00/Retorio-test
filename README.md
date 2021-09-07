Retorio-test
==============

## Introduction

This Project is made to get the following data

```
{
  address: string;
  phone: string;
  website: string;
  home: {
      won: number;
      lost: number;
    };
  away: {
      won: number;
      lost: number;
    };
  avgGoalScored: number;
}
```

## Developer notes
- ```npm install``` to install the dependencies 
- Navigate to swagger ```http://localhost:3000/api/```
- Try it out example


  header ```{token : '8dccc1eaa3154e389b26d4a55ec998db'}```

  body ``` {
  "season":"2018",
  "teamName":"Manchester City FC",
  "competitionCode": "PL"
  }```
