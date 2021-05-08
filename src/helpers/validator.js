import 'text-encoding-polyfill';
import Joi from 'joi';

export const validateFirstRegistration = data => {
    return Joi.object({
        email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: false } }),
        pass: Joi.string().min(6).max(100).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeatPass: Joi.ref('pass')
    }).validate(data);
};

export const validateLogin = data => {
    return Joi.object({
        email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: false } }),
        password: Joi.string().min(6).max(100).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }).validate(data);
};

export const validateSecondRegistration = data => {
    return Joi.object({
        firstName: Joi.string().min(2).max(100).required(),
        lastName: Joi.string().min(2).max(100).required(),
        username: Joi.string().min(2).max(30).required(),
        image: Joi.string().uri(),
        type: Joi.string().allow('BMX', 'SKATE', 'SCOOTER', 'BLADES').required()
    }).validate(data);
};

export const validateProfile = data => {
    return Joi.object({
        firstName: Joi.string().min(2).max(100).required(),
        lastName: Joi.string().min(2).max(100).required(),
        username: Joi.string().min(2).max(30).required(),
        image: Joi.string().uri(),
        type: Joi.string().allow('BMX', 'SKATE', 'SCOOTER', 'BLADES').required(),
        description: Joi.string().max(300).allow(''),
    }).validate(data);
};

export const validateSpot = data => {
    return Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(500).required(),
        size: Joi.string().allow('SKATEPARK', 'STAIR_SETS', 'RAILS', 'LEDGES', 'GAPS').required(),
        type: Joi.string().allow('SMALL', 'MEDIUM', 'LARGE').required(),
        image: Joi.string().uri(),
    }).validate(data);
};