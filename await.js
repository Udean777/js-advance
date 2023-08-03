const cobaPromise = () => {
  return new Promise((resolve, reject) => {
    const waktu = 6000;
    {
      waktu < 5000
        ? setTimeout(() => {
            resolve("Selesai");
          }, 2000)
        : reject("Lama bet dah lu");
    }
  });
};

// const coba = cobaPromise();
// coba.then(() => console.log(coba)).catch(() => console.log(coba));

const cobaAsync = async () => {
  try {
    const coba = await cobaPromise();
    console.log(coba);
  } catch (error) {
    console.error(error);
  }
};

cobaAsync();

