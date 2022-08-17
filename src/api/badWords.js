

export const validateText=async({
  text
})=>{
  var myHeaders = new Headers();
myHeaders.append("apikey", "0jD17L6MxL09Dbtw8TV8aGIeiqpln49K");

var raw = text;

var requestOptions = {
  method: 'POST',
  redirect: 'follow',
  headers: myHeaders,
  body: raw
};

const validation = await fetch("https://api.apilayer.com/bad_words?censor_character=*", requestOptions)
  .then(response => response.json())
  .then(result => {return result})
  .catch(error => {return error});
return validation;
};
