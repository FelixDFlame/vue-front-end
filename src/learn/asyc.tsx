function resolveAfter2Seconds() {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        reject('reject');
      }, 2000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    let result;
    try{
      result = await resolveAfter2Seconds();
    }catch(e){
        result = 'so sad boi';
    }
    console.log(result);
    // expected output: 'resolved'
  }
  
  asyncCall();