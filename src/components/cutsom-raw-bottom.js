import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

export const CustomRawBottom = React.forwardRef((props, ref) => {
  // forward ref kullanma sebebimiz https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={props.height}
      width={props.width}
      customStyles={{
        draggableIcon: {
          backgroundColor: '#C7C7CC',
          width: props.iconWidth || 48,
          height: props.iconHeight || 4,
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      {props.children}
    </RBSheet>
  );
});
