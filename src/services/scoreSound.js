import h01 from "../assets/sounds/high_rating/high_01.wav";
import h02 from "../assets/sounds/high_rating/high_02.wav";
import h03 from "../assets/sounds/high_rating/high_03.wav";
import h04 from "../assets/sounds/high_rating/high_04.wav";
import h05 from "../assets/sounds/high_rating/high_05.wav";
import h06 from "../assets/sounds/high_rating/high_06.wav";
import h07 from "../assets/sounds/high_rating/high_07.wav";
import h08 from "../assets/sounds/high_rating/high_08.wav";
import h09 from "../assets/sounds/high_rating/high_09.wav";
import h10 from "../assets/sounds/high_rating/high_10.wav";

import l01 from "../assets/sounds/low_rating/low_01.wav";
import l02 from "../assets/sounds/low_rating/low_02.wav";
import l03 from "../assets/sounds/low_rating/low_03.wav";
import l04 from "../assets/sounds/low_rating/low_04.wav";
import l05 from "../assets/sounds/low_rating/low_05.wav";
import l06 from "../assets/sounds/low_rating/low_06.wav";
import l07 from "../assets/sounds/low_rating/low_07.wav";
import l08 from "../assets/sounds/low_rating/low_08.wav";
import l09 from "../assets/sounds/low_rating/low_09.wav";
import l10 from "../assets/sounds/low_rating/low_10.mp3";


const h01s = new Audio(h01);
const h02s = new Audio(h02);
const h03s = new Audio(h03);
const h04s = new Audio(h04);
const h05s = new Audio(h05);
const h06s = new Audio(h06);
const h07s = new Audio(h07);
const h08s = new Audio(h08);
const h09s = new Audio(h09);
const h10s = new Audio(h10);

const l01s = new Audio(l01);
const l02s = new Audio(l02);
const l03s = new Audio(l03);
const l04s = new Audio(l04);
const l05s = new Audio(l05);
const l06s = new Audio(l06);
const l07s = new Audio(l07);
const l08s = new Audio(l08);
const l09s = new Audio(l09);
const l10s = new Audio(l10);



const rand = (length) => {
    const min = 0;
    const max = length;
    let random = Math.floor(Math.random() * (+max - +min)) ;
    return random;
}

const playScoreSound = (score, rDiff) => {

    

    switch (score) {
        case 1:
            if(rDiff < 0){
                l01s.play()
            }
            else{
                h01s.play()
            }
            
        break;
        case 2:
            if(rDiff < 0){
                l02s.play()
            }
            else{
                h02s.play()
            }
        break;
        case 3:
            if(rDiff < 0){
                l03s.play()
            }
            else{
                h03s.play()
            }
        break;
        case 4:
            if(rDiff < 0){
                l04s.play()
            }
            else{
                h04s.play()
            }
        break;
        case 5:
            if(rDiff < 0){
                l05s.play()
            }
            else{
                h05s.play()
            }
        break;
        case 6:
            if(rDiff < 0){
                l06s.play()
            }
            else{
                h06s.play()
            }
        break;
        case 7:
            if(rDiff < 0){
                l07s.play()
            }
            else{
                h07s.play()
            }
        break;
        case 8:
            if(rDiff < 0){
                l08s.play()
            }
            else{
                h08s.play()
            }
        break;
        case 9:
            if(rDiff < 0){
                l09s.play()
            }
            else{
                h09s.play()
            }
        break;
        case 10:
            if(rDiff < 0){
                l10s.play()
            }
            else{
                h10s.play()
            }
        break;

        default:
    }

    

}
 
export default playScoreSound;