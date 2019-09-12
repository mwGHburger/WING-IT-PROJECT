import consumer from "./consumer";

const channelConfig = {
  // Same name as the Channel class you generated in Rails
  channel: "MapChannel"
};

const channelCallbacks = {
  // Called when the subscription is created.
  initialized: () => {
    console.log("subscription")
  },
  // Called when a broadcast is received
  received: (data) => {
    console.log(data, 'received action cable')
    // add marker to the map

    mainMap.addPost(data, { highlight: true });
  }
};

const initMapChannel = () => {
  consumer.subscriptions.create(channelConfig, channelCallbacks);
}

export { initMapChannel };
