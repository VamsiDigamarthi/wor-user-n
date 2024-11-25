import axios from '../../Constants/url';
import React from 'react';
import { Button, View, Text } from 'react-native';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));


const hitApi = async()=>{

    console.log("hit");
    
    // const data = await axios.get("/")
    // console.log(data.data);
    
}

const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    while (BackgroundService.isRunning()) {
        hitApi();        
        await sleep(delay); 


    }
};

const options = {
    taskName: 'Location',
    taskTitle: 'Running Background Task',
    taskDesc: 'Executing background task description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
        delay: 1000,
    },
};

const BgTest = () => {
    const startTask = async () => {
        try {
            await BackgroundService.start(veryIntensiveTask, options);
            console.log('Background Service started');
        } catch (error) {
            console.error('Error starting background service:', error);
        }
    };

    const stopTask = async () => {
        try {
            await BackgroundService.stop();
            console.log('Background Service stopped');
        } catch (error) {
            console.error('Error stopping background service:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>React Native Background Task Example</Text>
            <Button title="Start Background Task" onPress={startTask} />
            <Button title="Stop Background Task" onPress={stopTask} />
        </View>
    );
};

export default BgTest;
