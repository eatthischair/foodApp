import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import RenderRatingsObj from '../ProfileScreen/RenderRatingsObj';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useUser} from '../UserContext'; // Path to your UserContext

const ReviewModal = ({review}) => {
  console.log('REVIEW IN REVIEW MODAL', review);

  return (
    <View>
      <RenderRatingsObj ratings={review.ratings}></RenderRatingsObj>
    </View>
  );
};
export default ReviewModal;
