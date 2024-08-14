import User from '../models/user.model'

import {connect} from '../mongodb/mongoose'

export const createOrUpdateUSer = async(
    id,
    first_name,
    last_name,
    image_url,
    email_addresses,
    username
) => {
    try{
    await connect ();

    const user = await User.findOneAndUpdate(
        {clerkId: id},
        {
            $set:{
                firstName: first_name,
                lastName:last_name,
                avatar: image_url,
                email: email_addresses[0].email,
                username:username
            },
        },
        {new: true, upsert: true}
    );
    return user;
}catch (error){
    console.log('Error connecting or updating user : ', error);
}
}; 


export const deleteUser = async (id) =>{
    try{
        await connect();
        await User.findOneAndDelete({clerId : id})
    }catch(error){
       console.log('Error deleting user', error);
    }
};