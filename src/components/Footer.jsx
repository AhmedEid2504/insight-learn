

const Footer = () => {
  return (
    <div>
      <footer className="bg-c_1 text-white p-5">
          <div className="flex flex-wrap gap-5 items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">About Us</h1>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor, tortor a ultrices.</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Services</h1>
              <ul className="mt-2">
                <li>Web Development</li>
                <li>Mobile Development</li>
                <li>Desktop Development</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Contact Us</h1>
              <p className="mt-2">123 Main Street, New York, NY 10030</p>
              <p className="mt-2">Phone: +1-9876543210</p>
              <p>Email: info@yourwebsite.com</p>
            </div>
            <div className="flex items-center">
              <a href="#" target="_blank" className="mr-2">
                <img src="/images/facebook.png" alt="facebook" />
              </a>
              <a href="#" target="_blank" className="mr-2">
                <img src="/images/twitter.png" alt="twitter" />
              </a>
              <a href="#" target="_blank">
                <img src="/images/linkedIn.png" alt="linkedin" />
              </a>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center py-2">
            © 2024 Learn Insights. All Rights Reserved.
          </div>
      </footer>
    </div>
  )
}

export default Footer
