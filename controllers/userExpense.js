const User = require("../models/user");



//add or update user month by earing data
exports.addOrUpdateUserMonthByEarning = async (req, res) => {
    const { month, year, earning } = req.body;
    console.log(req.body);
    console.log(month, year, earning)
    try{
        //check if user exists
        const user = await User.findOne({ _id: req.id }).exec();
        if(user){
            //check if month exists
            console.log(user.monthByEarning);
            //console.log(user);
           // if (user.monthByEarning != undefined)   {
    
           const monthExists = user.monthByEarning.find((m) => m.month == month && m.year == year);
        
            if(monthExists ){
                //update
                console.log('update');
                const user = await User.findOneAndUpdate(
                    { _id: req.id, "monthByEarning.month": month, "monthByEarning.year": year },
                    { $set: { "monthByEarning.$.earning": earning } },
                    { new: true }
                ).exec();
                //send only updated month data not all month data
                const updatedMonth = user.monthByEarning.find((m) => m.month == month && m.year == year);
                console.log(updatedMonth);
                res.status(200).json({
                    message: "Month by earning updated successfully",
                    month: updatedMonth
                });

            //} 
        }
        else{
                //add
                console.log('add');
              const user = await User.findByIdAndUpdate(
                    { _id: req.id },
                    { $push: { monthByEarning: { month: month, year: year, earning: earning } } },
                    { new: true }
                ).exec()          
                //send only updated month data not all month data
                const updatedMonth = user.monthByEarning.find((m) => m.month == month && m.year == year);
                console.log(updatedMonth);
                res.status(200).json({
                    message: "Month by earning added successfully",
                    month: updatedMonth
                });
            }
        }else{
            res.status(400).json({
                error: 'Something went wrong 22'
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: 'Something went wrong!!'
        })
    }
};

//sum of all month earning
exports.sumOfAllMonthEarning = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.id }).exec();
        if(user){
            if(user.monthByEarning == undefined || user.monthByEarning.length == 0){
                res.json(0);
                return;
            }
            const sum = user.monthByEarning.reduce((prev, curr) => {
                return prev + curr.earning;
            }, 0);
            res.json(sum);
        }else{
            res.status(400).json({
                error: 'Something went wrong'
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: 'Something went wrong'
        })
    }
}

//get current month earning
exports.getCurrentMonthEarning = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.id }).exec();
        if(user){
            if(user.monthByEarning == undefined || user.monthByEarning.length == 0){
                console.log('no month');
                res.json({earning: 0});
                return;
            }
            Nmonth = new Date().getMonth()+1;
            Nyear = new Date().getFullYear();
            const { month, year } = req.body;
            
            console.log(month, year);

            const currentMonth = user.monthByEarning.find((m) => m.month ==  month && m.year == year);
            if(!currentMonth){
               // console.log('no month 22');
                res.json({earning: 0});
                return;
            }
            res.json(currentMonth);
        }else{
            res.status(400).json({
                error: 'Something went wrong'
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: 'Something went wrong'
        })
    }
}

