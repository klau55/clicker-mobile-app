module.exports = {
  name: "Boxing Clicker",
  slug: "boxing-clicker",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  extra: {
    developmentIP: process.env.DEVELOPMENT_IP || "192.168.1.119"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  }
}; 