import { Platform } from 'react-native';
export const imageSelectOptions = Platform.OS == 'ios' ? {
  saveToPhotos: true,
  mediaType: 'photo',
  includeBase64: false,
  videoQuality: 'medium',
  selectionLimit: 1,
  maxWidth: 600,
  maxHeight: 800,
  quality: 0.5
} : {
  saveToPhotos: true,
  mediaType: 'photo',
  includeBase64: false,
  videoQuality: 'medium',
  selectionLimit: 1,
  maxWidth: 768,
  maxHeight: 1024,
}