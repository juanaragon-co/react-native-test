import React, { useState } from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';

interface AlertProps {
  title: string;
  content: string;
  visible: boolean;
  onDismiss: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, content, visible, onDismiss }) => {


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default Alert;
