import React, { useState } from 'react';
import { View, Image, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PhotoManager = ({ photos, setPhotos }) => {
  const [newTag, setNewTag] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setPhotos(prevPhotos => [...prevPhotos, ...result.assets.map(asset => ({ ...asset, tags: [] }))]);
    } else {
      console.log("No images selected or operation was canceled.");
    }
  };

  const addTag = (index) => {
    if (newTag.trim()) {
      setPhotos(prevPhotos => {
        const updatedPhotos = [...prevPhotos];
        updatedPhotos[index].tags.push(newTag.trim());
        return updatedPhotos;
      });
      setNewTag('');
    }
  };

  const removePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Button title="Select Photos" onPress={pickImage} />
      <View style={styles.photosContainer}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoWrapper}>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => removePhoto(index)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.tagInputContainer}>
              <TextInput
                style={styles.tagInput}
                placeholder="Add a tag"
                value={newTag}
                onChangeText={setNewTag}
              />
              <Button title="Add" onPress={() => addTag(index)} />
            </View>
            <View style={styles.tagsContainer}>
              {photo.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  photoWrapper: {
    position: 'relative',
    margin: 5,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tagInputContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  tagInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginRight: 5,
    padding: 5,
    width: 100,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
  },
  tagText: {
    color: '#555',
  },
});

export default PhotoManager;
