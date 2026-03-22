import "./home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import ImageSlider from "../../components/imageSlider/Imageslider";
import RuleBox from "../../components/rulebox/Rulebox";

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the user data from the context
  console.log(user);

  return (
    <div className="home-page ">

      <div className="intro  bg-gradient-to-r from-gray-100 to-blue-200 rounded-sm ">
        <div className="desc border-7 border-white   ">
          <ImageSlider />
        </div><br />
        <div className="img flex flex-col">
          <h3 className="text-black font-semibold">
            Welcome to I.M.I.T Hostel Management System
          </h3>
          <br />
          <h4 className="text-black text-sm">
            Effortless hostel management at your fingertips.
          </h4>
          <p className="text-black text-sm">
            Managing a hostel has never been easier! Management System offers an
            all-in-one platform for hostel owners, wardens, and students to
            streamline operations, ensure security, and enhance the living
            experience.
          </p>
          <br />
          <h4 className="text-sm  text-sm">
            [ Kindly Register yourself to access the hostel management system. ]
          </h4>
          <br />
          <div className="explore flex">
            <button className="expbtn text-sm font-semibold" onClick={() => navigate("/hostels")}>
              Explore Hostel
            </button>
          </div>
        </div>
      </div>
      <br /> 
 <div className=" flex justify-end items-center bg-gradient-to-r from-blue-100 to-blue-300"> 
  <div className="flex justify-center gap-10 bg-slate-800 w-[40%] rounded-tl-xl  border-amber-500 border-r-10">
  <div><img src="./25-years-logo.png" alt="" width="70px" /></div>
  
 <div> <img src="./betislogan.png" alt="" width="60px" /></div>
 </div>
</div>

      <div className="choose ">

        <b>
          
          <h2>About I.M.I.T</h2>
        </b>
      </div>
      <br />
      <div className="container2 bg-slate-100">
        <div className=" w-[60%]  flex justify-center items-center ">
          <p className="text-sm   leading-relaxed">
            The Institute of Management and Information Technology (IMIT)
            Cuttack is a prestigious constituent institution of Biju Patnaik
            University of Technology (BPUT) in Odisha. Founded in 1962, the
            Institute was earlier known as the College of Accountancy and
            Management Studies (CAMS), Cuttack. Under the auspices of the Skill
            Development and Technical Education Department of the Government of
            Odisha, IMIT Cuttack stands as a premier institution dedicated to
            nurturing talent, fostering innovation, and shaping the future
            leaders in technology and management.
            <br /> <br />
            At IMIT Cuttack, we offer a diverse range of academic programs
            tailored to meet the evolving needs of the industry and society. Our
            flagship courses include the Master of Business Administration
            (MBA), Master of Computer Application (MCA), and Master of
            Technology (MTech) in Computer Science. These programs are
            meticulously designed to provide students with a comprehensive
            understanding of their respective fields, coupled with hands-on
            experience and practical skills development. <br /> <br />
            As a constituent college of BPUT, IMIT Cuttack benefits from a rich
            academic legacy and a strong network of resources. Our affiliation
            with BPUT ensures that our programs adhere to the highest academic
            standards and are aligned with industry trends and best practices.
            We emphasize a multidisciplinary approach, integrating theoretical
            knowledge with practical insights and experiential learning
            opportunities. Our goal is to equip students with the skills,
            competencies, and mindset required to excel in their chosen fields
            and make meaningful contributions to society. <br /> <br />
            
            IMIT Cuttack maintains strong partnerships with leading companies
            and organizations in the industry to facilitate internships,
            projects, and placements for our students. These collaborations
            provide students with valuable exposure to the real-world work
            environment, helping them develop essential skills, build
            professional networks, and enhance their employability. Our
            placement cell works tirelessly to connect students with job
            opportunities and career advancement prospects, ensuring a smooth
            transition from academia to industry. <br /> <br />
          </p>
        </div>
        <div className="why  w-[25%] flex justify-center items-center flex-col rounded-xl  border-white">
          <div className="principal h-[50%]">
            <img
              src="./principalSir.jpg"
              alt="primg"
              className="h-55 rounded-xl border-4 border-amber-500"
            />
          </div>
          <div className="absir">
            <h3 className="text-white">Principal</h3>
            <p className="text-white">Prof.(Dr.) Manas Ranjan Kabat</p> <br />
            <p className="text-white text-xs ">
              Dear All,
              <br />
              As the Principal of Institute of Management and Information
              Technology (IMIT) Cuttack, it gives me great pleasure to welcome
              you to our vibrant academic community. At IMIT, we are committed
              to nurturing the next generation of leaders and innovators in the
              fields of technology, business, and computing. Our holistic
              approach to education emphasizes not only academic excellence but
              also personal growth, ethical values, and social responsibility.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center font-bold">Meet our Hostel Management Staff</h1>
      <div className="container3 h-65 w-[100%] flex justify-center items-center gap-80 rounded-xl border-4 border-white">
        <div className="satyasir bg-slate-100 h-37 w-[37%]  gap-7 flex  items-center  ">
          <img
            src="./satyasir.jpg"
            alt="superitendent"
            className="h-40 w-40  border-4 border-gray-400 rounded-full"
          />
          <div className="sinfo">
            <h4 className="text-black text-sm">Boys Hostel superitendent</h4>
            <p className="text-black">Mr. Satyaprakash Swain</p>
            <p className="text-black text-xs">Contact No : +91-9090705290</p>
          </div>
        </div>
        <div className="srutimam bg-slate-100 h-37 w-[37%] gap-7 flex flex-row-reverse items-center  rounded-xs  ">
          <img
            src="./srutimam.jpg"
            alt="superitendent"
            className="h-40 w-40 border-4 border-gray-400 rounded-full"
          />
          <div className="sinfo">
            <h4 className="text-black text-sm">Girls Hostel Superitendent</h4>
            <p className="text-black">Mrs. Srutipragyan Swain</p>
            <p className="text-black text-xs">Contact No : +91-9778463968</p>
          </div>
        </div>
      </div>
      <h1 className="text-center font-semibold">[ A Step Towards Discipline and Respect ]</h1>
      <br />
      <div className="rules  h-40 text-sm">
        <p>
          Following rules is more than just obeying instructions — it's a sign
          of discipline , responsibility , and respect for others. In a hostel
          environment , rules are made to ensure safety , maintain harmony and
          create a peaceful space for everyone to live and grow. When you follow
          the rules , you show that you care about your own development as well
          as the comfort of those around you. It builds trust , reduces conflict
          and helps you form habits that will benefit you in every part of
          life—from classrooms to careers. Being disciplined today builds the
          foundation for a better tomorrow.
        </p>
      </div>
      <div className="ruleSection flex gap-17">
        <div className="rulepoints w-[50%]  ">
          <h2>1. Know the Rules Well</h2>
          <p className="rp">
            Read the hostel rulebook or notice board carefully. Make a note of
            important rules like curfew timing, visitor policies, noise limits,
            etc.
          </p><br />
          <h2>2. Set Personal Reminders</h2>
          <p className="rp">
            Use alarms or sticky notes to remind you of important timings (e.g.,
            curfew, meal times, study hours).{" "}
          </p> <br />
          <h2>3. Keep It Clean</h2>
          <p className="rp">
            Maintain cleanliness in your room and shared spaces. Hostel staff
            and roommates will appreciate it—and it avoids fines.
          </p><br />
          <h2> 4. Be Punctual</h2>
          <p className="rp">
            Stick to scheduled timings for entry/exit, meals, and lights-out.
            Being punctual shows respect for others' time and avoids unnecessary
            issues.
          </p> <br />
          <h2>5. Be Respectful</h2>
          <p className="rp">
            Respect hostel staff, wardens, and roommates. Avoid arguments—solve
            issues calmly or with the help of the warden if needed.
          </p> <br />
          <h2>6. Follow Safety Norms</h2>
          <p className="rp">
            Don’t use banned items (like heaters, induction stoves, etc.) unless
            allowed. In emergencies, follow the warden’s instructions strictly.
          </p> <br />
          <h2> 7. Maintain Noise Levels</h2>
          <p className="rp">
            Keep music, phone calls, and group discussions low, especially
            during study or rest hours.
          </p> <br />
          <h2> 8. Be Honest & Responsible</h2>
          <p className="rp">
            If you break a rule by mistake, own up to it. Avoid hiding things—it
            builds trust with the authorities.
          </p> <br />
          <h2> 9. Get Involved in Hostel Activities</h2>
          <p className="rp">
            Join events or meetings—it keeps you engaged and on good terms with
            others.
          </p><br />
          <h2>10. Help Others Follow the Rules</h2>
          <p className="rp">
            If you see a friend unintentionally breaking rules, remind them
            nicely.
          </p>
        </div>
        <div className="rulebox">
          <RuleBox />
        </div>
      </div> <br /><br />
      
      <div className="join">
        <h2>Join Us Today !</h2> <br />
        <div className="slogan text-sm">
          <p>
            Upgrade your hostel management experience with our powerful,
            easy-to-use system. Get started today and transform the way you
            manage your hostel!
          </p>
        </div>
        <button
          className="Cbtn cursor-pointer font-semibold duration-200 bg-blue-800 text-white text-sm"
          onClick={() => navigate("/contact")} >
          Contact Us
        </button>
      </div>
      
    </div>
  );
};
