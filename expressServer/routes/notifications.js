const { Expo } = require('expo-server-sdk');

/// req = { toPerson : phoneNumber , message :  'Helloss'}
router.post("/sendMessage", async (req, res) => {
    try {
        console.log('coming to notifications');
        let userData = await UserDetails.findOne({ phone: req.body.toPerson });
        console.log('toPerson',req.body.toPerson);
        const receiverPushToken = userData.pushToken;
        let messages = [];
        let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
        messages.push({
            to: receiverPushToken,
            sound: 'default',
            body: req.body.message,
            title : 'FromSumanAirtel',
            data: { _displayInForeground: true },
        });
        let chunks = expo.chunkPushNotifications(messages);
        console.log('chunks',chunks);
        let tickets = [];
        (async () => {
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
        res.send(createResponse(200, "Successfully sent the message", {}));
    } catch (ex) {
        res.send(createResponse(400, ex.message));
    }
});
