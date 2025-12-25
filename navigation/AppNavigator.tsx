import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AboutAuthorScreen from '../screens/AboutAuthorScreen';
import AboutBackendScreen from '../screens/AboutBackendScreen';
import AboutBoardEditorScreen from '../screens/AboutBoardEditorScreen';
import AboutEndToEndScreen from '../screens/AboutEndToEndScreen';
import AboutFrontendScreen from '../screens/AboutFrontendScreen';
import AboutMLScreen from '../screens/AboutMLScreen';
import AboutPipelineScreen from '../screens/AboutPipelineScreen';
import AboutProjectScreen from '../screens/AboutProjectScreen';
import PredictionScreen from '../screens/PredictionScreen';
import UploadScreen from '../screens/UploadScreen';
import * as ApiTypes from '../types/api';


export type RootStackParamList = {
    Upload: undefined;
    Prediction: {
        predictionData: ApiTypes.PredictionResponse; // Pass the result from the API call
        imageUri: string; // Original image URI for re-prediction
        fileName: string; // Original file name
    };
    AboutProject: undefined;
    AboutAuthor: undefined;
    AboutML: undefined;
    AboutEndToEnd: undefined;
    AboutPipeline: undefined;
    AboutFrontend: undefined;
    AboutBoardEditor: undefined;
    AboutBackend: undefined;
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
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutProject"
                component={AboutProjectScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutAuthor"
                component={AboutAuthorScreen}
                options={{ title: 'About The Author' }}
            />
            <Stack.Screen
                name="AboutML"
                component={AboutMLScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutEndToEnd"
                component={AboutEndToEndScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutPipeline"
                component={AboutPipelineScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutFrontend"
                component={AboutFrontendScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutBoardEditor"
                component={AboutBoardEditorScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AboutBackend"
                component={AboutBackendScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;