import 'react-native-gesture-handler';
import React from "react";
import RootNavigator from "./src/routes/Router";
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
    return (
        <PaperProvider>
            <RootNavigator/>
        </PaperProvider>
    );
};
