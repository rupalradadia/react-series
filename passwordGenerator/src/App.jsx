import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");

  const pwdRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (num) str += "0123456789";
    if (chars) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      pass += str[Math.floor(Math.random() * str.length + 1)];
    }

    setPassword(pass);
  }, [length, num, chars, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, num, chars, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    pwdRef.current?.select();
    pwdRef.current?.setSelectionRange(0, 2);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500 ">
        Password Generator
      </div>
      <div className="flex flex-direction-row items-center mx-40">
        <input
          type="text"
          value={password}
          className="w-full py-2 px-3 my-2 border-2 outline-none rounded-md"
          placeholder="password"
          readOnly
          ref={pwdRef}
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          copy
        </button>
      </div>
      <div className="flex flex-direction-row items-center mx-20">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={num}
            onChange={() => setNum((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={chars}
            onChange={() => setChars((prev) => !prev)}
          />
          <label>Chars</label>
        </div>
      </div>
    </>
  );
}

export default App;
