export default function passwordStrength(password){

    let score=0;

    if(password.length>=12)
        score++;

    if(/[A-Z]/.test(password))
        score++;

    if(/[a-z]/.test(password))
        score++;

    if(/[0-9]/.test(password))
        score++;

    if(/[!@#$%^&*]/.test(password))
        score++;

    switch(score){

        case 0:
        case 1:
            return{
                color:"bg-red-500",
                label:"Muy débil",
                value:20
            };

        case 2:
            return{
                color:"bg-orange-500",
                label:"Débil",
                value:40
            };

        case 3:
            return{
                color:"bg-yellow-500",
                label:"Media",
                value:60
            };

        case 4:
            return{
                color:"bg-blue-600",
                label:"Fuerte",
                value:80
            };

        default:

            return{

                color:"bg-green-600",

                label:"Muy fuerte",

                value:100

            };

    }

}