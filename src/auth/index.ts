import * as jose from 'jose'
import {createSecretKey} from 'crypto'

const secretKey= new TextEncoder().encode(`${process.env.PRIVATE_KEY}`)

const sign= async (data:any)=>{
    const jwt= await new jose.SignJWT({data})
    .setProtectedHeader({alg:'HS256'})
    .setIssuer(`${process.env.HOST}`)
    .setExpirationTime('1h') //1hr
    .sign(secretKey)

    return jwt
}

const verify=async (token:string)=>{
    let pass=false

    console.log(token)
    try {
        const {payload, protectedHeader}= await jose.jwtVerify(token, secretKey,{
            issuer:`${process.env.HOST}`
        })
        pass=true
    } catch (error) {
       console.log(error)
    }
    return pass
}

export{
    sign,
    verify
}