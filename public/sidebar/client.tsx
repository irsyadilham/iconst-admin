interface args {
  className?: string;
}

export default function Client({className}: args) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 6.875C8.11807 6.875 8.72225 6.69172 9.23616 6.34834C9.75006 6.00496 10.1506 5.51691 10.3871 4.94589C10.6236 4.37487 10.6855 3.74654 10.565 3.14034C10.4444 2.53415 10.1467 1.97733 9.70971 1.54029C9.27267 1.10325 8.71585 0.805626 8.10966 0.685047C7.50347 0.564469 6.87513 0.626354 6.30411 0.862878C5.7331 1.0994 5.24504 1.49994 4.90166 2.01384C4.55828 2.52775 4.375 3.13193 4.375 3.75C4.37599 4.5785 4.70555 5.37278 5.29139 5.95861C5.87722 6.54445 6.6715 6.87401 7.5 6.875ZM7.5 1.875C7.87084 1.875 8.23335 1.98497 8.54169 2.191C8.85004 2.39702 9.09036 2.68986 9.23227 3.03247C9.37419 3.37508 9.41132 3.75208 9.33897 4.1158C9.26663 4.47951 9.08805 4.8136 8.82583 5.07583C8.5636 5.33805 8.22951 5.51663 7.86579 5.58897C7.50208 5.66132 7.12508 5.62419 6.78247 5.48228C6.43986 5.34036 6.14702 5.10004 5.94099 4.7917C5.73497 4.48335 5.625 4.12084 5.625 3.75C5.625 3.25272 5.82254 2.77581 6.17417 2.42418C6.52581 2.07255 7.00272 1.875 7.5 1.875ZM2.5 14.375H12.5C12.6658 14.375 12.8247 14.3092 12.9419 14.1919C13.0592 14.0747 13.125 13.9158 13.125 13.75V11.25C13.124 10.4215 12.7944 9.62722 12.2086 9.04139C11.6228 8.45555 10.8285 8.12599 10 8.125H5C4.1715 8.12599 3.37722 8.45555 2.79139 9.04139C2.20555 9.62722 1.87599 10.4215 1.875 11.25V13.75C1.875 13.9158 1.94085 14.0747 2.05806 14.1919C2.17527 14.3092 2.33424 14.375 2.5 14.375ZM3.125 11.25C3.125 10.7527 3.32254 10.2758 3.67417 9.92418C4.02581 9.57255 4.50272 9.375 5 9.375H10C10.4973 9.375 10.9742 9.57255 11.3258 9.92418C11.6775 10.2758 11.875 10.7527 11.875 11.25V13.125H3.125V11.25Z" fill="#878787"/>
    </svg>
  );
}