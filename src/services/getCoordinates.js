export const getCoordeinates = async () => {
   try {
      const posittion = await new Promise ((resolve,reject) => {
       navigator.geolocation.getCurrentPosition(resolve,reject);
      });

      return { latitude : posittion.coords.latitude , longitude: posittion.coords.longitude }
   } catch (_) {
      return null   
   }
};


