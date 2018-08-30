
const mdlinks= require(mdlinks);
  const axios= require('axios');
  
  console.log(mdlinks)
  axios.get(links)
  .then(function (response) {
    arrLinks.push({
      status: response.status,
      validate: response.statusText
    })
    
    console.log(arrLinks)   
  })
  .catch(function () {
    arrLinks.push({
      status:'404',
      validate: 'fail'
    })
    console.log(arrLinks)
  })