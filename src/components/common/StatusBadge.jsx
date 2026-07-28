import React from "react";


const StatusBadge = ({

    status

}) => {



const colors={



pending:

"bg-yellow-100 text-yellow-700",


confirmed:

"bg-blue-100 text-blue-700",


processing:

"bg-purple-100 text-purple-700",


shipped:

"bg-indigo-100 text-indigo-700",


delivered:

"bg-green-100 text-green-700",


cancelled:

"bg-red-100 text-red-700",


active:

"bg-green-100 text-green-700",


inactive:

"bg-gray-100 text-gray-700"



};





return (


<span


className={

`

px-3

py-1

rounded-full

text-sm

font-medium

${

colors[status?.toLowerCase()]

||

"bg-gray-100 text-gray-700"

}

`

}


>

{status}


</span>


);


};


export default StatusBadge;