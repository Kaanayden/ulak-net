
import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic';

import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import { PermissionsAndroid } from 'react-native';
import { List, Button, Text } from 'react-native-paper';


const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Access fine location required for discovery',
            message:
                'In order to perform discovery, you must enable/allow ' +
                'fine location access.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const requestBluetoothPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
            title: 'Access  location required for discovery',
            message:
                'In order to perform discovery, you must enable/allow ' +
                'bluetooth scan access.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
};
const requestBluetoothConnectPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
            title: 'Access  location required for discovery',
            message:
                'In order to perform discovery, you must enable/allow ' +
                'bluetooth connect access.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export default function BluetoothTestScreen({navigation}) {
    const [bondedDevices, setBondedDevices] = useState([]);
    const [accepting, setAccepting] = useState(false);

    const [messageData, setMessageData] = useState([]);
    const [messageListener, setMessageListener] = useState(null);

    useEffect(() => {

        const refreshLoop = setInterval(() => {
            try {
                refreshDevices();
            } catch (e) {

            }

        }, 2000);
        return () => {
            clearInterval(refreshLoop);
        }
    }, []);

    async function handleGivePermissions() {
        requestAccessFineLocationPermission();
        requestBluetoothPermission();
        requestBluetoothConnectPermission();
    }

    async function refreshDevices() {
        const devices = await RNBluetoothClassic.getBondedDevices();
        for (let i = 0; i < devices.length; i++) {
            devices[i].connected = await devices[i].isConnected();
        }
        setBondedDevices(devices);
    }

    async function handleConnect(device) {
        try {
            await device.connect();
            await subscribeToDevice(device);
        } catch (e) {
            console.log("exception", e);
        }

    }

    async function handleDisconnect(device) {
        try {
            device.disconnect();
        } catch (e) {
            console.log("exception", e);
        }

    }

    async function acceptConnections() {
        setAccepting(true);

        try {
            const device = await RNBluetoothClassic.accept({});
            //only works in receiver
            subscribeToDevice(device);
        } catch (error) {
            // Handle error accordingly
            console.log("error", error);
        } finally {
            setAccepting(false);
        }
    }

    async function sendMessage(device) {
        const isSent = await device.write("Alo" + "\n");
        console.log("isSent", isSent);
    }

    async function subscribeToDevice(device) {
        if (!messageListener) {
            const listener = device.onDataReceived((event) => {
                setMessageData(
                    current => [...current, event]
                );
                console.log("listener event", event);
            });
            setMessageListener(listener);
        }
    }

    async function handleChat(device) {
        navigation.navigate( "ChatScreen", {
            device: device,
        } );
    }

    return (
        <View>
            <Text>ULAK NET</Text>
            <Button onPress={handleGivePermissions}>Give Permissions</Button>
            <Button onPress={refreshDevices}>Refresh Devices</Button>
            {!accepting && <Button onPress={acceptConnections}>Accept Connections</Button>}

            <FlatList
                data={bondedDevices}
                keyExtractor={item => item.id}
                renderItem={(item) => {
                    return (<List.Item
                        title={item.item.name}
                        description={item.item.id + " " + (item.item.connected ? "Connected" : "Not Connected")}
                        left={props => <List.Icon {...props} icon="bluetooth" />}
                        right={props =>
                            <View>
                                {item.item.connected ?
                                    <Button onPress={() => handleDisconnect(item.item)}>Disconnect</Button>
                                    :
                                    <Button onPress={() => handleConnect(item.item)}>Connect</Button>
                                }
                                <Button onPress={() => sendMessage(item.item)}>Send Message</Button>
                                <Button onPress={() => subscribeToDevice(item.item)}>Subscribe</Button>
                            </View>
                        }

                        onPress={() => handleChat(item.item)}
                    />)
                }}
            />

            <FlatList
                data={messageData}
                keyExtractor={item => item.timestamp}
                renderItem={(item) => {
                    return (<Text>{item.item.data}</Text>)
                }}
            />


        </View>
    );

}

