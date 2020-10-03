import axios from 'axios';

// export default axios.create({
//   baseURL: 'https://cricket.sportmonks.com/api/v2.0',
//   headers: {
//     Authorization:
//       'Bearer Tf5dYKanwqDuHMhJp6UOceEh8cDUPB0koobHSfDtnrHn9B9jPEv7IktTeSiO',
//   },
// });

export default axios.create({
  baseURL: 'https://api.api-cricket.com/cricket/?method',
  headers: {
    Authorization:
      'Bearer d9b26e1f9085e004f6e0c63665070be1856ee03d1995f850832b3dbc702dab1f',
  },
});

//api.api-cricket.com/cricket/?method=get_events&APIkey=d9b26e1f9085e004f6e0c63665070be1856ee03d1995f850832b3dbc702dab1f&date_start=2020-09-19&date_stop=2020-011-10&league_key=9785
