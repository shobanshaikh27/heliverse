
const FlipCard = ({ user }) => {
   
    const { id, first_name, last_name,email,gender,avatar,domain,available} = user
  
    return (
      <div>
        <div className="flex  flex-col justify-center">
          <div className="group h-80 w-80 [perspective:1000px] ">
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ">
              <div className="absolute inset-0 ">
                <img src={avatar} className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/20" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full rounded-xl bg-black/70 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] ">
                <div className="flex min-h-full flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold">{first_name} {last_name}</h1>
                  <p className="text-lg">{id}</p>
                  <p className="text-lg">Email: {email}</p>
                  <p className="text-lg">Gender: {gender}</p>
                  <p className="text-lg">Domain: {domain}</p>
                  <p className="text-lg">Available: {available.toString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default FlipCard
  