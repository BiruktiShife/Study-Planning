// "use client";
// import ScheduleForm from "./ScheduleForm";
// import ProgressTrack from "@/app/ProgressTracker/page";
// import PomodoroTimer from "./PomodoroTimer";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// export default function Home() {
//   const router = useRouter();
//   const session = useSession();
//   console.log(session);

//   if (session.status === "unauthenticated") {
//     router?.push("/login");
//   }

//   return (
//     <div className="space-y-8 p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
//         <ScheduleForm />
//         <ProgressTrack />
//         <PomodoroTimer />
//       </div>
//     </div>
//   );
// }
