const Loader = () => {
    return (
        <>
<svg
      xmlns="http://www.w3.org/2000/svg"
      style={{margin: "auto", marginTop: "200px", marginLeft: "300px"}}
      width="1000"
      height="500"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <g transform="translate(50, 50)">
        <animateTransform
          attributeName="transform"
          dur="0.2s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0;45"
        ></animateTransform>
        <path
          fill="#e15b64"
          d="M29.492-5.5h8v11h-8a30 30 0 01-4.75 11.465L30.4 22.62 22.62 30.4l-5.656-5.657A30 30 0 015.5 29.492v8h-11v-8a30 30 0 01-11.465-4.75L-22.62 30.4-30.4 22.62l5.657-5.656A30 30 0 01-29.492 5.5h-8v-11h8a30 30 0 014.75-11.465L-30.4-22.62l7.779-7.779 5.656 5.657A30 30 0 01-5.5-29.492v-8h11v8a30 30 0 0111.465 4.75L22.62-30.4 30.4-22.62l-5.657 5.656A30 30 0 0129.492-5.5M0-20a20 20 0 100 40 20 20 0 100-40"
        ></path>
      </g>
    </svg>
        </>
    )
}

export default Loader;