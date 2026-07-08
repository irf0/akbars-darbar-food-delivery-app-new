export const restaurantConfig = {
    name: 'Akbar Darbar',
    tagline: 'Authentic Flavours, Delivered Fresh',
    logoLetter: 'D',

    supportPhone: '+91XXXXXXXXXX',
    supportEmail: 'support@darbar.com',
    whatsappNumber: '+91XXXXXXXXXX',

    city: 'Tinsukia',
    address: '',
    restaurantLat: 27.481815607680797,
    restaurantLong: 95.34053740534065,
    deliveryRadius: 5,

    currencySymbol: '₹',
    currencyCode: 'INR',
    gstNumber: '',
    fssaiLicenseNumber: '',

    timezone: 'Asia/Kolkata',
    defaultOpeningTime: '11:00',
    defaultClosingTime: '23:00',

    appVersion: '2.0.0',
    minSupportedAppVersion: '2.0.0',
    playStoreUrl: '',
    appStoreUrl: '',

    privacyPolicyUrl: '',
    termsOfServiceUrl: '',
    refundPolicyUrl: '',

    razorpayKeyId: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID,
} as const