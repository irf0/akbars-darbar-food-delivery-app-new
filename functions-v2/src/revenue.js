const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function totalRevenue() {
  const snapshot = await db.collection('orders').get();

  // let deliveryRevenue = 0;
  // let takeawayRevenue = 0;

  // snapshot.forEach(doc => {
  //     const data = doc.data();

  //     if (data.orderStatus === "Delivered") {
  //         if (data.orderDeliveryMethod === "Delivery") {
  //             deliveryRevenue += data.totalAmount;
  //         } else {
  //             takeawayRevenue += data.totalAmount;
  //         }
  //     }
  // });

  // console.log("Delivery Revenue:", deliveryRevenue);
  // console.log("Takeaway Revenue:", takeawayRevenue);
  // console.log("Total Revenue:", deliveryRevenue + takeawayRevenue);

  // const methods = {};

  // snapshot.forEach(doc => {
  //     const data = doc.data();

  //     const method = data.orderDeliveryMethod || "Missing";
  //     methods[method] = (methods[method] || 0) + 1;
  // });

  // console.log(methods);

  // const statuses = {};

  // snapshot.forEach(doc => {
  //     const data = doc.data();

  //     if (data.orderDeliveryMethod === "Takeaway") {
  //         const status = data.orderStatus || "Missing";
  //         statuses[status] = (statuses[status] || 0) + 1;
  //     }
  // });

  // console.log(statuses);

  let deliveryRevenue = 0;
  let takeawayRevenue = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.orderDeliveryMethod === 'Delivery' && data.orderStatus === 'Delivered') {
      deliveryRevenue += Number(data.totalAmount || 0);
    }

    if (data.orderDeliveryMethod === 'Takeaway' && data.orderStatus === 'Collected') {
      takeawayRevenue += Number(data.totalAmount || 0);
    }
  });

  console.log('Delivery Revenue: ₹' + deliveryRevenue);
  console.log('Takeaway Revenue: ₹' + takeawayRevenue);
  console.log('Total Revenue: ₹' + (deliveryRevenue + takeawayRevenue));
}

totalRevenue().catch(console.error);

// 📅 Today's revenue
// 📆 This week's / month's revenue
// 📦 Total successful orders
// 💳 Online vs COD revenue
// 🚚 Delivery vs Takeaway percentage
// 🍗 Best-selling menu items
// 📈 Monthly revenue chart
