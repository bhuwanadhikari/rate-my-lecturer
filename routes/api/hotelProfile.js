const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Hotel = require('../../models/Hotel');
const Rating = require('../../models/Rating');

const {convertToAverageRating, sortByTopRate, sortByDate, sortForHome, countTotalRatings} = require('../../helpers/backendHelpers');


const router = express.Router();



//@route /api/hotelProfile/all
//get all of the hotels
//public
router.get('/all', (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
      if(!allHotels){
         errors.noHotels = 'There are no hotels at all';
      }
      const newHotelArr = allHotels.map((hotelProfile, index) => {
         const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
         return {
            averageRating: hotelAverageRating.toFixed(1),
            _id: hotelProfile.hotel._id,
            name: hotelProfile.hotel.name,
            avatar: hotelProfile.hotel.avatar,
            location: hotelProfile.hotel.location,
            reviews: countTotalRatings(hotelProfile.rates), // this is counted as rating in front end
         };
      });
      newHotelArr.sort((a,b) => a.name>b.name?1:-1);
      res.status(200).json(newHotelArr);

   })
});


//@route /api/hotelProfile/id/hotel_id
//get hotel by id
//public
router.get('/id/:hotel_id', (req, res) => {
   const errors = {};
   Rating.findOne({hotel: req.params.hotel_id})
      .populate('hotel')
      .then(hotelProfile => {
         if(!hotelProfile){
            errors.noHotel = 'There is no hotel for this ID';
            return res.status(400).json(errors);
         }
         res.status(200).json(hotelProfile);
      }).catch(e =>{
      errors.noHotel = 'There is no hotel for this ID';
      res.status(400).json(errors);

   });
});



//@route /api/hotelProfile/topRated
//get top rated hotels
//private
router.get('/top-rated', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
         if(!allHotels){
            errors.noHotels = 'There are no hotels at all';
         }
         const newHotelArr = allHotels.map((hotelProfile, index) => {
            const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
            return {
               averageRating: hotelAverageRating.toFixed(1),
               _id: hotelProfile.hotel._id,
               name: hotelProfile.hotel.name,
               avatar: hotelProfile.hotel.avatar,
               location: hotelProfile.hotel.location,
               reviews: countTotalRatings(hotelProfile.rates)
            };
         });
         const sortedArray = sortByTopRate(newHotelArr);

         res.status(200).json(sortedArray);

      })
});




//@route /api/hotelProfile/newest
//get newest hotels
//private
router.get('/newest', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
         if(!allHotels){
            errors.noHotels = 'There are no hotels at all';
         }
         const newHotelArr = allHotels.map((hotelProfile, index) => {
            const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
            return {
               averageRating: hotelAverageRating.toFixed(1),
               date: hotelProfile.hotel.date,
               _id: hotelProfile.hotel._id,
               name: hotelProfile.hotel.name,
               avatar: hotelProfile.hotel.avatar,
               location: hotelProfile.hotel.location,
               reviews: countTotalRatings(hotelProfile.rates)
            };
         });
         const sortedArray = sortByDate(newHotelArr);
         res.status(200).json(sortedArray);

      })
});


//@route /api/hotelProfile/home
//get home data
//private
router.get('/home', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
         if(!allHotels){
            errors.noHotels = 'There are no hotels at all';
            return res.status(400).json(errors);
         }
         // console.log("these are all hotels:", allHotels);
         res.status(200).json(sortForHome(allHotels));
      })
});



module.exports = router;
