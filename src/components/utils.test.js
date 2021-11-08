import {fetchApi} from './utils';

it('Get API Test Call Back Function',(done)=>{

    function callback(data){
        try{
            expect(data.stat).toBe("ok");
            done();
        }catch(error){
            done(error);
        }
    }

    fetchApi('',callback)
    fetchApi('car',callback)
})