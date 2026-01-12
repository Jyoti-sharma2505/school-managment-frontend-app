import React from 'react'
import { Link } from 'react-router-dom'

const Headers = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid px-5">
                    <Link class="navbar-brand" to="/">School Management System</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Students</a>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/class-view">Classes</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/school-view">School</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Headers
