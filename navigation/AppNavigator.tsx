import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AboutAuthorScreen from '../screens/AboutAuthorScreen';
import AboutProjectScreen from '../screens/AboutProjectScreen';
import PredictionScreen from '../screens/PredictionScreen';
import UploadScreen from '../screens/UploadScreen';
import * as ApiTypes from '../types/api';


export type RootStackParamList = {
    Upload: undefined; 
    Prediction: {
        predictionData: ApiTypes.PredictionResponse; // Pass the result from the API call
    };
    AboutProject: undefined;
    AboutAuthor: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Upload">
            <Stack.Screen 
                name="Upload" 
                component={UploadScreen} 
                options={{ title: 'Capture Board' }} 
            />
            <Stack.Screen 
                name="Prediction" 
                component={PredictionScreen} 
                options={{ title: 'Verify & Edit' }} 
            />
            <Stack.Screen 
                name="AboutProject" 
                component={AboutProjectScreen} 
                options={{ title: 'About This Project' }} 
            />
             <Stack.Screen 
                name="AboutAuthor" 
                component={AboutAuthorScreen} 
                options={{ title: 'About The Author' }} 
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;