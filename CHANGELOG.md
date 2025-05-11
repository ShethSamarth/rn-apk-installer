# 📄 Changelog

All notable changes to this project will be documented in this file.

---

## [0.1.0] - 2025-05-11

### Added

- Initial release of `rn-apk-installer`
- Support for installing APKs via file path on Android
- Android permissions handling (`REQUEST_INSTALL_PACKAGES`, `READ/WRITE_EXTERNAL_STORAGE`)
- FileProvider setup instructions for Android 7.0+
- Public API: `installApk(path: string): Promise<void>`

---

> This is the first stable version of the library. Feedback and contributions are welcome!
