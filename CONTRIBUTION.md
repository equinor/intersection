The content of this file is largely inspired by [bitprophet's contribution guide](https://github.com/bitprophet/contribution-guide.org/blob/master/index.rst).
This file is licensed under the _BSD 2-Clause "Simplified" License_ that follows:   

-------------
Copyright (c) 2020 Jeff Forcier.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
-------------

# How to contribute

## Submitting bugs

### Due diligence
-------------

Before submitting a bug, please do the following:

* Perform **basic troubleshooting** steps:

    * **Make sure you're on the latest version.** If you're not on the most
      recent version, your problem may have been solved already! Upgrading is
      always the best first step.
    * **Try older versions.** If you're already *on* the latest release, try
      rolling back a few minor versions (e.g. if on 1.7, try 1.5 or 1.6) and
      see if the problem goes away. This will help the devs narrow down when
      the problem first arose in the commit log.
    * **Try switching up dependency versions.** If the software in question has
      dependencies (other libraries, etc) try upgrading/downgrading those as
      well.

* **Search the project's bug/issue tracker** to make sure it's not a known
  issue.

What to put in your bug report
------------------------------

Make sure your report gets the attention it deserves: bug reports with missing
information may be ignored or punted back to you, delaying a fix.  The below
constitutes a bare minimum; more info is almost always better:

* **What operating system are you on?** Windows? (Vista? 7? 32-bit? 64-bit?)
  Mac OS X?  (10.7.4? 10.9.0?) Linux? (Which distro? Which version of that
  distro? 32 or 64 bits?) Again, more detail is better.
* **Which version or versions of the software are you using?** Ideally, you
  followed the advice above and have ruled out (or verified that the problem
  exists in) a few different versions.
* **How can the developers recreate the bug on their end?** If possible,
  include a copy of your code, the command you used to invoke it, and the full
  output of your run (if applicable.)

    * A common tactic is to pare down your code until a simple (but still
      bug-causing) "base case" remains. Not only can this help you identify
      problems which aren't real bugs, but it means the developer can get to
      fixing the bug faster.


Contributing changes
====================

Licensing of contributed material
---------------------------------

Keep in mind as you contribute, that code, docs and other material submitted to
open source projects are usually considered licensed under the same terms
as the rest of the work.

The details vary from project to project, but from the perspective of this
document's authors:

- Anything submitted to a project falls under the licensing terms in the
  repository's top level ``LICENSE`` file.

    - For example, if a project's ``LICENSE`` is BSD-based, contributors should
      be comfortable with their work potentially being distributed in binary
      form without the original source code.

- Per-file copyright/license headers are typically extraneous and undesirable.
  Please don't add your own copyright headers to new files unless the project's
  license actually requires them!

    - Not least because even a new file created by one individual (who often
      feels compelled to put their personal copyright notice at the top) will
      inherently end up contributed to by dozens of others over time, making a
      per-file header outdated/misleading.

Version control branching
-------------------------

* Always **fork the repo** or **make a new branch** for your work, no matter how small. This makes
  it easy for others to take just that one set of changes from your repository,
  in case you have multiple unrelated changes floating around.

    * A corollary: **don't submit unrelated changes in the same branch/pull
      request**! The maintainer shouldn't have to reject your awesome bugfix
      because the feature you put in with it needs more review.

* **Base your new branch off of the appropriate branch** on the main
  repository:

    * **Bug fixes** should be based on the branch named after the **oldest
      supported release line** the bug affects.

        * E.g. if a feature was introduced in 1.1, the latest release line is
          1.3, and a bug is found in that feature - make your branch based on
          1.1.  The maintainer will then forward-port it to 1.3 and master.
        * Bug fixes requiring large changes to the code or which have a chance
          of being otherwise disruptive, may need to base off of **master**
          instead. This is a judgement call -- ask the devs!

    * **New features** should branch off of **the 'master' branch**.

        * Note that depending on how long it takes for the dev team to merge
          your patch, the copy of ``master`` you worked off of may get out of
          date! If you find yourself 'bumping' a pull request that's been
          sidelined for a while, **make sure you rebase or merge to latest
          master** to ensure a speedier resolution.

Code formatting
---------------

* **Follow the style you see used in the primary repository**! Consistency with
  the rest of the project always trumps other considerations. It doesn't matter
  if you have your own style or if the rest of the code breaks with the greater
  community - just follow along.

Documentation isn't optional
----------------------------

It's not! Patches without documentation will be returned to sender. a separate commit should be added that contains the ouput from running `npm run docs`. Methods and classes should also have jsdoc documentation.

example:
```javascript
/**
 * increment number by 1
 * @param n - number to be incremented
 */
increment(n) {
  return n + 1;
}
```

Tests aren't optional
---------------------

Any bugfix that doesn't include a test proving the existence of the bug being
fixed, may be suspect.  Ditto for new features that can't prove they actually
work.

Your ideally include unit tests and/or storybooks to test and help describe what you are solving

We've found that test-first development really helps make features better
architected and identifies potential edge cases earlier instead of later.
Writing tests before the implementation is strongly encouraged.

Full example
------------

Here's an example workflow for a project ``theproject`` hosted on Github, which
is currently in version 1.3.x. Your username is ``yourname`` and you're
submitting a basic bugfix.

Preparing your Fork
^^^^^^^^^^^^^^^^^^^

1. Click 'Fork' on Github, creating e.g. ``yourname/theproject``.
2. Clone your project: ``git clone git@github.com:yourname/theproject``.
3. ``cd theproject``
4. Install the development requirements: ``npm install``.
5. Create a branch: ``git checkout -b foo-the-bars 1.3``.

Making your Changes
^^^^^^^^^^^^^^^^^^^

1. Add changelog entry crediting yourself.
2. Write tests expecting the correct/fixed functionality; make sure they fail.
3. Hack, hack, hack.
4. Run tests again, making sure they pass.
5. Commit your changes: ``git commit -m "Foo the bars"``

Creating Pull Requests
^^^^^^^^^^^^^^^^^^^^^^

1. Push your commit to get it back up to your fork: ``git push origin HEAD``
2. Visit Github, click handy "Pull request" button that it will make upon
   noticing your new branch.
3. In the description field, write down issue number (if submitting code fixing
   an existing issue) or describe the issue + your fix (if submitting a wholly
   new bugfix).
4. Hit 'submit'! And please be patient - the maintainers will get to you when
   they can.

## Setup guide

### Cloning repository

Start by cloning the repository to desired directory.

```
git clone --recursive https://github.com/equinor/esv-intersection.git
```

### Install dependencies

Install all dev dependencies defined in package.json using node.

```
npm install
```

## Usage

### Storybook

```
npm run storybook
```

### Document generation

```
npm run docs
```

This command will overwrite any old documentation

### Creating tests

All tests are defined within the test-folder. Jest naming convention is to place tests for SOMESCRIPT.ts in a single file SOMESCRIPT.test.ts.

### Testing

```
npm run test
```

Executes all tests defined within the test folder.

```
npm run test:watch
```

Executes all tests, but does not return immediately. Makes it possible to re-run failed tests quickly.

### Building/Compiling

```
npm run build
```

Compiles the code found within the src-folder. Build is outputted to a new dist-folder.