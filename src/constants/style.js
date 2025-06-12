import {
    StyleSheet
} from 'react-native';
import { COLORS } from './colors';

export const style = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: -12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },

});